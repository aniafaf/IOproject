import { useNavigate, useParams } from 'react-router'
import { CenterSplitLayout } from '../../../../components/CenterSplitLayout'
import { FieldSet } from '../../../../components/FieldSet'
import { FormHeading } from '../../../../components/FormHeading'
import { LoggedInGuard } from '../../../../components/LoggedInGuard'
import { Spinner } from '../../../../components/Spinner'
import { useAlert } from '../../../../hooks/alert'
import { useEffect, useState } from 'react'
import { post_group_join } from '../../../../api/groups'
import { FormButton } from '../../../../components/FormButton'
import { FormLink } from '../../../../components/FormLink'
import { Route } from '../../../../routes'
import { useForm } from '../../../../hooks/form'
import { get_query } from '../../../../helpers/get_query'

export const GroupJoinView = () => {
  const { groupId: group_id } = useParams()
  const alert = useAlert()
  const navigate = useNavigate()
  const [set, { hash, name }] = useForm({ hash: -1, name: '' })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    alert.hide()

    Promise.all([get_query('hash'), get_query('name')])
      .then(([h, n]) => (set('hash', +h), set('name', decodeURIComponent(n))))
      .catch(e => alert.display(e, 'error'))
      .finally(() => setLoading(false))
  }, [])

  const handleSubmit: React.FormEventHandler = e => {
    e.preventDefault()

    post_group_join({ group_id: +group_id!, hash }).then(r =>
      r.ok
        ? navigate(Route.home())
        : (alert.display(r.error, 'error'),
          r.redirect && navigate(r.redirect!)),
    )
  }

  const valid = name && hash !== -1

  return (
    <>
      <alert.AlertComponent />
      <Spinner open={loading} />
      <LoggedInGuard />
      <CenterSplitLayout>
        <FormHeading
          title='Group Invitation'
          subTitle={valid ? `Do you want to join ${name}?` : ''}
        />
        <form action='' onSubmit={handleSubmit}>
          <FieldSet width={'300px'}>
            <FormButton disabled={!valid} type='submit'>
              Join
            </FormButton>
            <FormLink align='center' to={Route.home()}>
              Return Home
            </FormLink>
          </FieldSet>
        </form>
      </CenterSplitLayout>
    </>
  )
}
