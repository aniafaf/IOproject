import { useNavigate, useRouteError } from 'react-router'
import { CenterSplitLayout } from '../../components/CenterSplitLayout'
import { FieldSet } from '../../components/FieldSet'
import { FormButton } from '../../components/FormButton'
import { FormHeading } from '../../components/FormHeading'
import { s } from '../../helpers/str'
import { Route } from '../../routes'

export const NotFound = () => {
  const path = document.location.hash.replace(/^#/i, '')
  const navigate = useNavigate()
  const error = useRouteError()

  return (
    <CenterSplitLayout>
      <FieldSet>
        <FormHeading title='Error: 404' subTitle={`Page ${path} not found`} />
        <p style={{textAlign: 'center'}} className='form_heading__subtitle'>{s`${error}`}</p>
        <FormButton
          style={{
            marginTop: '50px',
          }}
          onClick={() => navigate(Route.home())}
        >
          Go Back Home
        </FormButton>
      </FieldSet>
    </CenterSplitLayout>
  )
}
