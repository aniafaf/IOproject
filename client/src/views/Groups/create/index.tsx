import { useState } from 'react'
import { TextInputField } from '../../../components/TextInputField'
import { useForm } from '../../../hooks/form'
import { LoggedInGuard } from '../../../components/LoggedInGuard'
import { Spinner } from '../../../components/Spinner'
import { useAlert } from '../../../hooks/alert'
import { post_group_create } from '../../../api/groups'
import { FieldSet } from '../../../components/FieldSet'
import { FormButton } from '../../../components/FormButton'
import { useHref } from 'react-router'
import { Route } from '../../../routes'

export const GroupCreateView = () => {
  const [loading, setLoading] = useState(false)
  const alert = useAlert()
  const [setField, form] = useForm({
    name: '',
  })
  const [groupId, setGroupId] = useState('')
  const invitationBase = useHref(Route.groups.join(+groupId))
  const invitationLink = `${location.origin}/${invitationBase}/`

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault()

    setLoading(true)
    post_group_create(form)
      .then(r =>
        r.ok ? setGroupId(r.data as string) : alert.display(r.error, 'error'),
      )
      .catch(e => alert.display(e, 'error'))
      .finally(() => setLoading(false))
  }

  return (
    <>
      <LoggedInGuard />
      <Spinner open={loading} />
      <alert.AlertComponent />
      <form onSubmit={handleSubmit}>
        <FieldSet>
          <TextInputField label='name' onUpdate={v => setField('name', v)} />
          <FormButton type='submit'>Add group</FormButton>
        </FieldSet>
      </form>
      {groupId && (
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
    </>
  )
}
