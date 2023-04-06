import { CenterSplitLayout } from '../../components/CenterSplitLayout'
import { FieldSet } from '../../components/FieldSet'
import { FormButton } from '../../components/FormButton'
import { FormHeading } from '../../components/FormHeading'
import { FormLink } from '../../components/FormLink'
import { TextInputField } from '../../components/TextInputField'
import { Route } from '../../routes'
import { useEffect, useState } from 'react'
import { post_activate } from '../../api/post_activate'
import { useNavigate } from 'react-router-dom'
import { useAlert } from '../../hooks/alert'
import { get_token, get_uid } from './helpers'

export const ActiveAccountView = () => {
  const navigate = useNavigate()
  const [activationCode, setActivationCode] = useState('')
  const [uid, setUid] = useState('')
  const alert = useAlert()

  useEffect(() => {
    Promise.all([
      get_uid().then(setUid),
      get_token().then(setActivationCode),
    ]).catch(e => alert.display(e, 'error'))
  }, [])

  const handleSubmit = () => {
    alert.hide()
    let msg = []
    if (!activationCode) {
      msg.push('Missing activation token!')
    }
    if (!uid) {
      msg.push('Missing UID in the url!')
    }
    if (msg) {
      return alert.display(msg.join('\n'), 'error')
    }

    post_activate(uid, activationCode).then(r => {
      console.dir(r, { depth: 0 })
      debugger
      if (r.ok) {
        debugger
        navigate(Route.home())
      } else {
        alert.display(r.error, 'error')
        console.log(r.error)
      }
    })
  }

  return (
    <>
      <alert.AlertComponent />
      <CenterSplitLayout>
        <FieldSet>
          <FormHeading
            title={`Enter an activation code`}
            subTitle={`We sent you a code via email.`}
          />
          <TextInputField
            label='activation code'
            onUpdate={setActivationCode}
            value={activationCode}
          />
        </FieldSet>
        <FieldSet>
          <FormButton onClick={handleSubmit}>activate account</FormButton>
          <FormLink to={Route.login()} align='center'>
            Back to log in
          </FormLink>
        </FieldSet>
      </CenterSplitLayout>
    </>
  )
}
