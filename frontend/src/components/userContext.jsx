import axios from 'axios';
import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const UserContext = createContext();

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data } = await axios.get('/api/user', {
                    withCredentials: true, 
                });
                setUser(data);
            } catch (error) {
                console.error("Failed to fetch user:", error);
                setUser(null); 
            }
        };

        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}

UserContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default UserContextProvider;
