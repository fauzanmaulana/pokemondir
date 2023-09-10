import React, {ReactNode, useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import { resetActionStatus } from '../redux/slice/authSlice';

interface Props {
  children?: ReactNode
}

export default function AuthGuard({children}: Props){
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [isLoaded, setIsloaded] = useState(false)
  const isLogoutSuccess = useSelector((state: any) => state.auth.is_action_success)

  useEffect(() => {
    if(localStorage.getItem('authenticated') && JSON.parse(localStorage.getItem('authenticated')!).hasOwnProperty('token_app')){
      if(JSON.parse(localStorage.getItem('authenticated')!).token_app !== process.env.REACT_APP_TOKEN){
        navigate('/login')
      }
    }else{
      navigate('/login')
    }
    setIsloaded(true)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if(isLogoutSuccess){
      navigate('/login');
    }

    if(isLogoutSuccess !== false){
      return () => {
        dispatch(resetActionStatus())
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogoutSuccess])
  
  if(isLoaded){
    if(!children){
      navigate('/pokemons')
    }
    return <Dashboard>{children}</Dashboard>;
  }else{
    return <></>;
  }
}