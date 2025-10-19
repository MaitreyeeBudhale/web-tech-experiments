import { useState } from 'react';

export default function AuthApp() {
  const [mode, setMode] = useState('register');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    age: '',
    gender: '',
    dob: ''
  });
  const [message, setMessage] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });

    const endpoint = mode === 'register' ? '/api/auth/register' : '/api/auth/login';
    const payload = mode === 'register' 
      ? formData 
      : { username: formData.username, password: formData.password };

    try {
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ 
          text: data.message || `${mode === 'register' ? 'Registration' : 'Login'} successful!`, 
          type: 'success' 
        });
        
        // Clear form on success
        setFormData({
          username: '',
          password: '',
          age: '',
          gender: '',
          dob: ''
        });
      } else {
        setMessage({ 
          text: data.error || 'Something went wrong', 
          type: 'error' 
        });
      }
    } catch (error) {
      setMessage({ 
        text: 'Failed to connect to server. Make sure backend is running on port 3001.', 
        type: 'error' 
      });
    } finally {
      setLoading(false);
    }
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    setMessage({ text: '', type: '' });
    setFormData({
      username: '',
      password: '',
      age: '',
      gender: '',
      dob: ''
    });
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>User Authentication</h1>

        <div style={styles.tabs}>
          <button
            onClick={() => switchMode('register')}
            style={{
              ...styles.tab,
              ...(mode === 'register' ? styles.tabActive : {})
            }}
          >
            Register
          </button>
          <button
            onClick={() => switchMode('login')}
            style={{
              ...styles.tab,
              ...(mode === 'login' ? styles.tabActive : {})
            }}
          >
            Login
          </button>
        </div>

        {message.text && (
          <div style={{
            ...styles.message,
            ...(message.type === 'success' ? styles.success : styles.error)
          }}>
            {message.text}
          </div>
        )}

        <div onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              style={styles.input}
              placeholder="Enter username"
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              style={styles.input}
              placeholder="Enter password"
            />
          </div>

          {mode === 'register' && (
            <>
              <div style={styles.formGroup}>
                <label style={styles.label}>Age</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                  min="1"
                  max="150"
                  style={styles.input}
                  placeholder="Enter age"
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  style={styles.input}
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  required
                  style={styles.input}
                />
              </div>
            </>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              ...styles.button,
              ...(loading ? styles.buttonDisabled : {})
            }}
          >
            {loading ? 'Processing...' : mode === 'register' ? 'Create Account' : 'Sign In'}
          </button>
        </div>

        <div style={styles.info}>
          Backend should be running on http://localhost:3001
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: '#f0f0f0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    fontFamily: 'Arial, sans-serif'
  },
  card: {
    background: 'white',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '400px'
  },
  title: {
    textAlign: 'center',
    marginBottom: '30px',
    color: '#333',
    fontSize: '24px'
  },
  tabs: {
    display: 'flex',
    gap: '10px',
    marginBottom: '30px'
  },
  tab: {
    flex: 1,
    padding: '10px',
    border: 'none',
    background: '#f5f5f5',
    cursor: 'pointer',
    borderRadius: '4px',
    fontSize: '16px',
    transition: 'all 0.3s'
  },
  tabActive: {
    background: '#007bff',
    color: 'white'
  },
  message: {
    padding: '12px',
    borderRadius: '4px',
    marginBottom: '20px',
    textAlign: 'center',
    fontSize: '14px'
  },
  success: {
    background: '#d4edda',
    color: '#155724',
    border: '1px solid #c3e6cb'
  },
  error: {
    background: '#f8d7da',
    color: '#721c24',
    border: '1px solid #f5c6cb'
  },
  formGroup: {
    marginBottom: '20px'
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    color: '#555',
    fontSize: '14px'
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
    boxSizing: 'border-box'
  },
  button: {
    width: '100%',
    padding: '12px',
    background: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '10px',
    transition: 'background 0.3s'
  },
  buttonDisabled: {
    background: '#ccc',
    cursor: 'not-allowed'
  },
  info: {
    textAlign: 'center',
    marginTop: '20px',
    fontSize: '12px',
    color: '#666'
  }
};