import { Link } from 'react-router-dom';
import { logout } from '../services/authService';

const Navbar = ({ isAuthenticated }) => {
    const handleLogout = async () => {
        try {
            await logout();
            window.location.href = '/login';
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <nav className="bg-blue-600 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-xl font-bold">Secure File Share</Link>
                <div className="space-x-4">
                    {!isAuthenticated ? (
                        <>
                            <Link to="/login" className="hover:text-blue-200">Login</Link>
                            <Link to="/signup" className="hover:text-blue-200">Sign Up</Link>
                        </>
                    ) : (
                        <>
                            <Link to="/dashboard" className="hover:text-blue-200">Dashboard</Link>
                            <button onClick={handleLogout} className="hover:text-blue-200">Logout</button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
