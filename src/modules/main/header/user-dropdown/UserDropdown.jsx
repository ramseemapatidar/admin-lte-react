import React ,{ useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';

import { StyledBigUserImage, StyledSmallUserImage } from '../../../../styles/common'
import { 
    UserBody,
    UserFooter,
    UserHeader,
    UserMenuDropdown 
} from '../../../../styles/dropdown-menus'

export const UserDropdown = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <UserMenuDropdown isOpen={dropdownOpen} hideArrow>
      <StyledSmallUserImage
        slot="head"
        src=""
        fallbackSrc="/img/default-profile.png"
        alt="User"
        width={25}
        height={25}
        rounded
      />
      <div slot="body">
        <UserHeader className=" bg-primary">
          <StyledBigUserImage
            src=""
            fallbackSrc="/img/default-profile.png"
            alt="User"
            width={90}
            height={90}
            rounded
          />
          <p>ram@imast.in
            <small>
              <span>Member since </span>
              <span>
                {/* {DateTime.fromISO(user.createdAt).toFormat('dd LLL yyyy')} */}
              </span>
            </small>
          </p>
        </UserHeader>
        <UserBody>
          <div className="row">
            <div className="col-4 text-center">
              <Link to="/">followers</Link>
            </div>
            <div className="col-4 text-center">
              <Link to="/">sales</Link>
            </div>
            <div className="col-4 text-center">
              <Link to="/">friends</Link>
            </div>
          </div>
        </UserBody>
        <UserFooter>
          <button
            type="button"
            className="btn btn-default btn-flat"
           
          >
            profile
          </button>
          <button
            type="button"
            className="btn btn-default btn-flat float-right"
           
          >
            logout
          </button>
        </UserFooter>
      </div>
    </UserMenuDropdown>
  )
}
