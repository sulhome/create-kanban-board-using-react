import React from 'react';

const Header = ({title}) => {

    return (
        <h1 className='bg-dark text-center text-white mb-5 py-3'>
            {title}
        </h1>
    );
};

export default Header;