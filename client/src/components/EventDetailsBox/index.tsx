import { Route } from '../../routes'
import './index.css'
import { useEffect, useState } from 'react'
import {
  EventDetails,
  GroupDetails,
  PaymentCategory,
  string_of_payment_category,
} from '../../api/groups'
import { useAlert } from '../../hooks/alert'
import { Link } from 'react-router-dom'

export const EventDetailsBox = ({
  event,
  payments,
  group,
  users,
}: GroupDetails & Partial<EventDetails>) => {
  if (!event) {
    return <></>
  }

  return (
    <>
      <div className='group_details_box'>
        <div className='events_box'>
          <div className='events_list_box'>
            <h1 style={{ color: '#FEFEFE', fontFamily: 'Libre Bodoni' }}>
              payments
            </h1>
            <ul className='event_list' style={{ color: '#073B78' }}>
              {payments?.map(({ id, name, amount, description, category }) => (
                <li key={id} className='event_element' title={description}>
                  {name} {amount}${' '}
                  {category
                    ? string_of_payment_category(category as PaymentCategory)
                    : ''}
                </li>
              ))}
            </ul>

            <div style={{ position: 'absolute', right: 20, top: 20 }}>
              <Link
                className='events_button'
                to={Route.groups.events(group?.id!).payments(event.id).add()}
              >
                +
              </Link>
            </div>
          </div>
        </div>
        <div className='members_box'>
          <div className='members_list_box'>
            <h2 style={{ color: '#073B78', fontFamily: 'Libre Bodoni' }}>
              members
            </h2>
            <ul className='members_list'>
              {users?.map(
                ({ username, first_name: name, last_name: surname }, i) => (
                  console.dir({ name, surname }),
                  (
                    <li className='user_element' key={i}>
                      {name} {surname} ({username})
                    </li>
                  )
                ),
              )}
            </ul>
          </div>
          {/* <div>
            <button className='groups_button' onClick={handleDialogOpen}>
              invite
            </button>
          </div> */}
        </div>
      </div>
      {/* <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Invitation link</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Link to={invLink}>{invLink}</Link>
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
                invLink,
              )}`}
            />
          </DialogContentText>
        </DialogContent>
      </Dialog> */}
    </>
  )
}
