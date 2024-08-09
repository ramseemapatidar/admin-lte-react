import React ,{ useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { StyledBigUserImage, StyledSmallUserImage } from '../../../../styles/common'
import { 
    UserBody,
    UserFooter,
    UserHeader,
    UserMenuDropdown 
} from '../../../../styles/dropdown-menus'
import { toast } from 'react-toastify';
import { logoutUser } from '@store/reducers/auth';


export const UserDropdown = () => {
  const navigate = useNavigate();
  const [t] = useTranslation();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.user);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const logOut = async (event) => {
    event.preventDefault();
    try {
      await dispatch(logoutUser());  // Call the logoutUser function
      setDropdownOpen(false);
      toast.success('Logout successful!');
      navigate('/login');  // Redirect to login page
    } catch (error) {
      toast.error(error.response?.data?.message || 'Logout failed');
    }
  };

  const navigateToProfile = (event) => {
    event.preventDefault();
    setDropdownOpen(false);
    navigate('/profile');
  };

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
          <p>{userInfo.name}
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
          <Link to = "/profile"
            type="button"
            className="btn btn-default btn-flat"
          >
            profile
          </Link>
          <button
            type="button"
            className="btn btn-default btn-flat float-right"
            onClick={logOut}
          >
            {t('login.button.signOut')}
          </button>
        </UserFooter>
      </div>
    </UserMenuDropdown>
  )
}
