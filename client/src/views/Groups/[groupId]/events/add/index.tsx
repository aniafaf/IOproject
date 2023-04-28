import { useNavigate, useParams } from 'react-router'
import { useAlert } from '../../../../../hooks/alert'
import { FormEventHandler, useState } from 'react'
import { TextInputField } from '../../../../../components/TextInputField'
import { useForm } from '../../../../../hooks/form'
import { curry } from '../../../../../helpers/curry'
import './index.css'
import { FormHeading } from '../../../../../components/FormHeading'
import { FormButton } from '../../../../../components/FormButton'
import { Spinner } from '../../../../../components/Spinner'
import { Link } from 'react-router-dom'
import { Route } from '../../../../../routes'
import { post_event_add } from '../../../../../api/events'
import { str } from '../../../../../helpers/str'
import { LoggedInGuard } from '../../../../../components/LoggedInGuard'

export const EventAddView = () => {
  const { groupId } = useParams()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const alert = useAlert()
  const [set_, form] = useForm({
    name: '',
  })
  const set = curry(set_)

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
        <Link to={Route.groups.byId(+groupId!)} className='back-button'>
          group view
        </Link>
        <form onSubmit={handleSubmit} action='' className='event-add-form'>
          <FormHeading title='Create Event' />
          <TextInputField
            onUpdate={set('name')}
            value={form.name}
            label='name'
            className='event-add-input'
          />
          <FormButton className='event-add-button-light'>Add Event</FormButton>
        </form>
      </div>
    </>
  )
}
