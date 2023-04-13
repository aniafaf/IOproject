import { useParams } from 'react-router'
import { CenterSplitLayout } from '../../../../components/CenterSplitLayout'
import { FieldSet } from '../../../../components/FieldSet'
import { FormHeading } from '../../../../components/FormHeading'
import { LoggedInGuard } from '../../../../components/LoggedInGuard'
import { Spinner } from '../../../../components/Spinner'
import { useAlert } from '../../../../hooks/alert'
import { useEffect, useState } from 'react'
import { Group, get_group_details } from '../../../../api/groups'
import { useForm } from '../../../../hooks/form'
import { FormButton } from '../../../../components/FormButton'
import { FormLink } from '../../../../components/FormLink'
import { Route } from '../../../../routes'

export const GroupJoinView = () => {
  const { groupId } = useParams()
  const alert = useAlert()
  const [loading, setLoading] = useState(true)
  const [group, setGroup] = useState<Group | undefined>({
    id: +groupId!,
    name: 'Morgage',
    admin: {
      name: 'Ashley',
      surname: 'Gavin',
      email: 'e.gavin@gmail.com',
      username: 'dabutch',
      id: 5,
    },
  })

  useEffect(() => {
    alert.hide()

    get_group_details(+groupId!)
      .then(r =>
        r.ok
          ? setGroup(
              r.data?.group ?? {
                id: groupId,
                name: 'Morgage',
                admin: {},
              },
            )
          : alert.display(r.error, 'error'),
      )
      .catch(e => alert.display(e, 'error'))
      .finally(() => setLoading(false))
  }, [])

  const handleSubmit: React.FormEventHandler = e => {
    e.preventDefault()
  }

  return (
    <>
      <alert.AlertComponent />
      <Spinner open={loading} />
      {/* <LoggedInGuard/> */}
      <CenterSplitLayout>
        <FormHeading
          title='Group Invitation'
          subTitle={
            group &&
            `Do you want to join ${group.admin.username}'s ${group.name} group?`
          }
        />
        <form action='' onSubmit={handleSubmit}>
          <FieldSet width={'300px'}>
            <FormButton type='submit'>Join</FormButton>
            <FormLink align='center' to={Route.home()}>
              Return Home
            </FormLink>
          </FieldSet>
        </form>
      </CenterSplitLayout>
    </>
  )
}
