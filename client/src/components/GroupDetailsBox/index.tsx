import { Route, useNavigate } from 'react-router'
import { FormButton } from '../FormButton'
import './index.css'

export const GroupDetailsBox = () => {
  const navigate = useNavigate()
  return (
    <>
      <div className='group_details_box'>
        <div className='events_box'>
              <h1 style={{ color: '#FEFEFE', fontFamily: 'Libre Bodoni' }}>
                events
              </h1>
              <ul className='group_list' style={{ color: '#073B78' }}>
                {/* {groups.map((group, i) => (
                  <GroupListItemElement {...group} key={i} />
                ))} */}
                <li>event1</li>
                <li>event2</li>
                {/* @TODO chage button style and make grouplistClicable */}
              </ul>

            <div style={{position: 'absolute', right: 20, top: 20}}>
                <button className='events_button' onClick={() => navigate(Route.groups.create())}>
                    +
                </button>
            </div>
        </div>
        <div className='members_box'>
            <div className='members_list_box'>
              <h2 style={{ color: '#073B78', fontFamily: 'Libre Bodoni' }}>
                members
              </h2>
              <ul className='group_list' >
                {/* {groups.map((group, i) => (
                  <GroupListItemElement {...group} key={i} />
                ))} */}
                <li className='user_element'>user1</li>
                <li>user2</li>
                {/* @TODO chage button style and make grouplistClicable */}
              </ul>
            </div>
            <div>
              <button className='groups_button' onClick={() => navigate(Route.groups.create())}>
                invite
              </button>
            </div>
        </div>
      </div>
    </>
  )
}
