import { PropsWithChildren } from 'react'
import './index.css'

export interface CenterSplitLayoutProps {}

/**
 * Puts children into a horizontally centered, and vertically maxed container in the left-hand-side are of [the sign-in/up etc.](https://www.figma.com/file/aikya1pXvuMFWfmYnMZyez/Untitled?node-id=11-2&t=LIPby69LbGQ4fPr4-0) design
 */
export const CenterSplitLayout = ({
  children,
}: PropsWithChildren<CenterSplitLayoutProps>) => (
  <>
    <div className='center_split'>
      <main className='center_split__container'>
        <div className='sub_container sub_container--left'>
          <div className='sub_container__children'>{children}</div>
        </div>
        <div className='sub_container sub_container--right'></div>
      </main>
    </div>
  </>
)
