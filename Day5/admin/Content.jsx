import React, { useEffect, useState } from 'react'
// import AddPlan from './AddPlan';
import UserDetails from './UserDetails';
import RechargeHistory from './RechargeHistory';
import AdminForm from './AdminForm';
import ViewPlans from './ViewPlans';

const Content = ({activeLink}) => {

    const [content,setContent] = useState(null);

    useEffect(() => {
        const arr = {
            link1: <ViewPlans />,
            link2: <UserDetails/>,
            link3: <RechargeHistory/>,
            link4: <AdminForm/>
            
        }
        setContent(arr[activeLink])
    }, [activeLink])


  return (
    <div className='flex justify-center items-center'>
      {content}
    </div>
  )
}

export default Content
