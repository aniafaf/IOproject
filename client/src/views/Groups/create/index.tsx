import { TextInputField } from '../../../components/TextInputField'
import { useForm } from '../../../hooks/form'
import { LoggedInGuard } from '../../../components/LoggedInGuard'
import { Spinner } from '../../../components/Spinner'
import { useAlert } from '../../../hooks/alert'
import { Group, post_group_create } from '../../../api/groups'
import { FieldSet } from '../../../components/FieldSet'
import { FormButton } from '../../../components/FormButton'
import { useHref} from 'react-router'
import { Route } from '../../../routes'
import { LoggedInPanel } from '../../../components/LoggedInPanel'
import './index.css'
import { FormLink } from '../../../components/FormLink'
import { useState } from 'react'
import { useInvLink } from '../../../hooks/use_inv_link'

export const GroupCreateView = () => {
  const [loading, setLoading] = useState(false)
  const alert = useAlert()
  const [setField, form] = useForm({
    name: '',
  })
  const [group, setGroup] = useState<Group | undefined>(undefined)
  const invitationLink = useInvLink(group)

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault()

    setLoading(true)
    post_group_create(form)
      .then(r => (r.ok ? setGroup(r.data) : alert.display(r.error, 'error')))
      .catch(e => alert.display(e, 'error'))
      .finally(() => setLoading(false))
  }

  return (
    <>
      <LoggedInGuard />
      <Spinner open={loading} />
      <alert.AlertComponent />

      <div className='main_page_box'>
        <div className='user_info'>
          <div className='user_info--top'>
            <LoggedInPanel
              setLoading={setLoading}
              onLogoutError={e => alert.display(e, 'error')}
            />
          </div>
          <div className='user_info--bottom'>
            <div>
              <FormLink to={Route.groups.list()}>go to group view</FormLink>
            </div>
          </div>
        </div>
        <div className='add_group_panel'>
          <form onSubmit={handleSubmit}>
            <FieldSet>
              <TextInputField
                label='name'
                onUpdate={v => setField('name', v)}
              />
              <FormButton type='submit'>Add group</FormButton>
            </FieldSet>
          </form>
          {group && (
            <>
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
                  invitationLink,
                )}`}
              />
              <p>
                invitation link: <a href={invitationLink}>{invitationLink}</a>
              </p>
            </>
          )}
        </div>
      </div>
    </>
  )
}
