import { useState, useEffect } from 'react';

export default function StudentRecordApp() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({ name: '', roll_no: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const API_URL = 'http://localhost:5000/api/students';

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setStudents(data);
    } catch (err) {
      setMessage('Error fetching students');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('Student added successfully!');
        setFormData({ name: '', roll_no: '' });
        fetchStudents();
      } else {
        setMessage(data.error || 'Failed to add student');
      }
    } catch (err) {
      setMessage('Error connecting to server');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Student Records</h1>

      <div style={styles.formCard}>
        <h2 style={styles.subtitle}>Add New Student</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            name="name"
            placeholder="Student Name"
            value={formData.name}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="text"
            name="roll_no"
            placeholder="Roll Number"
            value={formData.roll_no}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? 'Adding...' : 'Add Student'}
          </button>
        </form>
        {message && (
          <p style={{
            ...styles.message,
            color: message.includes('success') ? '#059669' : '#dc2626'
          }}>
            {message}
          </p>
        )}
      </div>

      <div style={styles.listCard}>
        <h2 style={styles.subtitle}>All Students ({students.length})</h2>
        {students.length === 0 ? (
          <p style={styles.emptyMessage}>No students added yet</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Roll No</th>
                <th style={styles.th}>Added On</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id} style={styles.tr}>
                  <td style={styles.td}>{student.name}</td>
                  <td style={styles.td}>{student.roll_no}</td>
                  <td style={styles.td}>
                    {new Date(student.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif'
  },
  title: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '30px'
  },
  subtitle: {
    fontSize: '20px',
    color: '#555',
    marginBottom: '15px'
  },
  formCard: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '30px',
    backgroundColor: '#f9f9f9'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  input: {
    padding: '10px',
    fontSize: '14px',
    border: '1px solid #ccc',
    borderRadius: '4px'
  },
  button: {
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  message: {
    marginTop: '10px',
    fontSize: '14px',
    fontWeight: 'bold'
  },
  listCard: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '20px',
    backgroundColor: '#fff'
  },
  emptyMessage: {
    textAlign: 'center',
    color: '#999',
    padding: '20px'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse'
  },
  th: {
    textAlign: 'left',
    padding: '12px',
    borderBottom: '2px solid #ddd',
    backgroundColor: '#f5f5f5',
    fontWeight: 'bold'
  },
  td: {
    padding: '12px',
    borderBottom: '1px solid #eee'
  },
  tr: {
    transition: 'background-color 0.2s'
  }
};