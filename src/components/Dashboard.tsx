import React, { ReactNode } from 'react'
import Bottombar from './Bottombar';
import Navbar from './Navbar';

type ContainerProps = {
    children: ReactNode
};

const Dashboard = (props: ContainerProps) => {
    return (
        <section>
            <Navbar/>
            <div className='p-10 mb-16 md:mb-0'>{props.children}</div>
            <Bottombar/>
        </section>
    )
}

export default Dashboard