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
  string_of_payment_category,
} from '../../../../../../../api/groups'
import { User } from '../../../../../../../api/users'

export const PaymentAddView = () => {
  const { groupId, eventId } = useParams()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const alert = useAlert()
  const [all_users, set_all_users] = useState<User[]>([])
  const [set_, form] = useForm<PaymentCreationForm>({
    name: '',
    amount: 0,
    description: undefined,
    category: undefined,
    even: undefined,
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
            set('users_debt')(r.data.users.map(() => 0)))
          : r.redirect
          ? navigate(r.redirect)
          : alert.display(r.error, 'error'),
      )
      .catch(e => alert.display(e, 'error'))
      .finally(() => setLoading(false))
  }, [])

  const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault()
    setLoading(true)
    alert.hide()

    post_event_add(+groupId!, form)
      .then(r =>
        r.ok
          ? navigate(Route.groups.byId(+groupId!))
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
          </div>
          <FormButton className='event-add-button-light'>
            Add Payment
          </FormButton>
        </form>
      </div>
    </>
  )
}
