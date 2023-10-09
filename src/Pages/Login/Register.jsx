import { Link, useNavigate } from 'react-router-dom';
import SocialLogin from './SocialLogin';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';

const Register = () => {

    const { createUser, handleUpdateProfile } = useAuth();
    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault();
    
        // Get field values
        const name = event.target.name.value;
        const email = event.target.email.value;
        const image = event.target.image.value;
        const password = event.target.password.value;
        console.log(name, email, image, password);
    
        // Password validation
        if (password.length < 6) {
            toast.error('Password must be at least 6 characters');
            return;
        }
    
        // Creating a new user
        createUser(email, password)
            .then((res) => {
                handleUpdateProfile(name, image)
                    .then(() => {
                        toast.success('User created successfully');
                        navigate('/');
                    })
            })
            .catch((error) => {
                toast.error(error.message);
            });
    }

    return (
        <>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Register now!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Full Name</span>
                                </label>
                                <input type="text" name='name' placeholder="Full name" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name='email' placeholder="email" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Image Url</span>
                                </label>
                                <input type="text" name='image' placeholder="image url" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name='password' placeholder="password" className="input input-bordered" />
                            </div>
                            <div className="form-control mt-6 p-0">
                                <button className="btn btn-neutral" type='submit'>Register</button>
                            </div>
                            <label className="label">
                                Have an account? <Link to="/login" className="label-text-alt link link-hover">Please Login</Link>
                            </label>
                            <SocialLogin />
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;