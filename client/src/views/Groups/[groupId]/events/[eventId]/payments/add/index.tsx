import { useNavigate, useParams } from 'react-router'
import { useAlert } from '../../../../../../../hooks/alert'
import { FormEventHandler, useEffect, useState } from 'react'
import { TextInputField } from '../../../../../../../components/TextInputField'
import { useForm } from '../../../../../../../hooks/form'
import { curry } from '../../../../../../../helpers/curry'
import { FormHeading } from '../../../../../../../components/FormHeading'
import { FormButton } from '../../../../../../../components/FormButton'
import { Spinner } from '../../../../../../../components/Spinner'
import { Link } from 'react-router-dom'
import { Route } from '../../../../../../../routes'
import { post_event_add } from '../../../../../../../api/events'
import { str } from '../../../../../../../helpers/str'
import { LoggedInGuard } from '../../../../../../../components/LoggedInGuard'
import './index.css'
import SelectInput from '@mui/material/Select/SelectInput'
import { SelectInputField } from '../../../../../../../components/SelectInputField'
import {
  PaymentCategory,
  PaymentCreationForm,
  get_payment_add_details,
  payment_categories,
  post_payment_add,
  string_of_payment_category,
} from '../../../../../../../api/groups'
import { User } from '../../../../../../../api/users'
import { Checkbox } from '@mui/material'

export const PaymentAddView = () => {
  const { groupId, eventId } = useParams()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const alert = useAlert()
  const [user_splits, set_user_splits] = useState<
    Record<number, { amount: number; included: boolean }>
  >({})
  const [all_users, set_all_users] = useState<User[]>([])
  const [set_, form] = useForm<PaymentCreationForm>({
    name: '',
    amount: 0,
    description: undefined,
    category: undefined,
    even: true,
    users_debt: [],
    users_id: [],
  })
  const set = curry(set_)

  useEffect(() => {
    alert.hide()
    setLoading(true)

    get_payment_add_details(+groupId!, +eventId!)
      .then(r =>
        r.ok
          ? (set_all_users(r.data.users),
            set('users_id')(r.data.users.map(({ id }) => id)),
            set('users_debt')(r.data.users.map(() => 0)),
            set_user_splits(
              Object.fromEntries(
                r.data.users.map(({ id }) => [
                  id,
                  { included: true, amount: 0 },
                ]),
              ),
            ))
          : r.redirect
          ? navigate(r.redirect)
          : alert.display(r.error, 'error'),
      )
      .catch(e => alert.display(e, 'error'))
      .finally(() => setLoading(false))
  }, [])

  const isValid = () => {
    const errors = []

    if (form.name === '') {
      errors.push('Name cannot be empty.')
    }

    if (form.amount <= 0) {
      errors.push('Amount must be positive.')
    }

    const summed_amount = Object.values(user_splits).reduce(
      (u, { included, amount }) => u + (included ? amount : 0),
      0,
    )
    if (!form.even && form.amount !== summed_amount) {
      errors.push(
        `Given shares (=${summed_amount}) don't add up to the specified amount (=${form.amount})`,
      )
    }

    if (errors.length > 0) {
      alert.display(str(errors), 'warning')
    }
    return errors.length === 0
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault()
    alert.hide()

    if (!isValid()) {
      return
    }

    setLoading(true)

    const included_users = Object.entries(user_splits).filter(
      ([_, { included }]) => included,
    )

    post_payment_add(+groupId!, +eventId!, {
      ...form,
      users_id: included_users.map(([id]) => +id),
      users_debt: included_users.map(([_, { amount }]) => amount),
    })
      .then(r =>
        r.ok
          ? navigate(Route.groups.events(+groupId!).byId(+eventId!))
          : alert.display(r.error, 'error'),
      )
      .catch(e => alert.display(str(e), 'error'))
      .finally(() => setLoading(false))
  }

  return (
    <>
      <LoggedInGuard />
      <alert.AlertComponent />
      <Spinner open={loading} />
      <div className='main_page_box event-add-container'>
        <Link
          to={Route.groups.events(+groupId!).byId(+eventId!)}
          className='back-button'
        >
          event view
        </Link>
        <form
          onSubmit={handleSubmit}
          action=''
          className='event-add-form payment-add-form'
        >
          <FormHeading title='Create Payment' />
          <div className='event-add-form__container'>
            <div className='event-add-form__sub-container'>
              <div className='form_set'>
                <TextInputField
                  onUpdate={set('name')}
                  value={form.name}
                  label='name'
                  className='event-add-input'
                />
                <TextInputField
                  onUpdate={set('amount')}
                  value={`${form.amount}`}
                  label='amount'
                  type='number'
                  className='event-add-input'
                />
                <TextInputField
                  onUpdate={set('description')}
                  value={form.description}
                  label='description (optional)'
                  className='event-add-input'
                />
                <SelectInputField
                  value={form.category}
                  label='category (optional)'
                  onUpdate={set('category')}
                  values={payment_categories.map(value => ({
                    value,
                    label: string_of_payment_category(value),
                  }))}
                  className='event-add-input'
                />
                <div
                  className={`text_input text_input--valid`}
                  style={{
                    width: '100%',
                    display: 'flex',
                    flexFlow: 'row nowrap',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: '#ffffff',
                    padding: '5px 15px',
                    fontSize: '1.2rem',
                    borderRadius: '5px',
                  }}
                >
                  <label
                    style={{
                      color: '#636363',
                      textAlign: 'center',
                    }}
                    htmlFor='even-checkbox'
                  >
                    split even
                  </label>
                  <input
                    id='even-checkbox'
                    checked={!!form.even}
                    type='checkbox'
                    onChange={e => {
                      const v = form.even ? true : undefined
                      console.log([form.even, v])
                      set('even')(e.target.checked)
                    }}
                  />
                </div>
                <FormButton className='event-add-button-light'>
                  Add Payment
                </FormButton>
              </div>
            </div>
            <div className='event-add-form__sub-container'>
              <li className='users'>
                {all_users.map(({ id, first_name, last_name, username }, i) => (
                  <li key={i} className='users__item'>
                    <span className='users__item__name'>
                      {first_name} {last_name} ({username})
                    </span>
                    <input
                      className='users__item__checkbox'
                      type='checkbox'
                      name={`include_${id}`}
                      id={`include_${id}`}
                      checked={user_splits[id].included}
                      onChange={e => {
                        set_user_splits({
                          ...user_splits,
                          [id]: {
                            ...user_splits[id],
                            included: e.target.checked,
                          },
                        })
                      }}
                    />
                    <input
                      className='users__item__amount'
                      type='number'
                      name={`amount_${id}`}
                      id={`amount_${id}`}
                      value={user_splits[id].amount}
                      disabled={form.even}
                      onChange={e =>
                        set_user_splits({
                          ...user_splits,
                          [id]: {
                            ...user_splits[id],
                            amount: +e.target.value,
                          },
                        })
                      }
                    />
                  </li>
                ))}
              </li>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}
