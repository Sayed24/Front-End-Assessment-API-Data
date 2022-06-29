// mycomponent.js
import React, { useEffect, useState } from 'react';
import { Student } from './student';
import axios from 'axios';

const MyComponent = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]); //data from API
    const [query, setQuery] = useState('');

    // Fethcing data from the API
    const fetchData = async () => {
        setLoading(true);
        try {
            const { data: response } = await axios.get(
                'https://api.hatchways.io/assessment/students'
            );
            setData(response.students);
        } catch (error) {
            console.error(error.message);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Search filter by name
    const handleSearchStudents = (students) => {
        return students.filter((student) =>
            [
                student.firstName,
                student.lastName,
                `${student.firstName} ${student.lastName}`,
            ].some((search) => search.toLowerCase().includes(query.toLowerCase()))
        );
    };



    return (
        <div>
            {loading && <div>Loading</div>}
            {!loading && (
                <div>
                    <h2 className='title'>Front-End Assessment - Student Profiles</h2>

                    {/* rendering student filter search by name */}
                    <div>
                        <input
                            className='student-search'
                            type='search'
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder='Search by name'
                        />
                    </div>

                    {/* rendering student search by tag name */}
                    <div>
                        <input
                            className='student-search'
                            type='text'
                            onChange={handleSearchStudents}
                            placeholder='Search by tag'
                        />
                    </div>

                    {/* redering data from API  */}
                    <ul className='student-list'>
                        {data &&
                            handleSearchStudents(data).map((student) => (
                                <Student
                                    key={student.id}
                                    pic={student.pic}
                                    firstName={student.firstName}
                                    lastName={student.lastName}
                                    email={student.email}
                                    company={student.company}
                                    skill={student.skill}
                                    grades={student.grades}
                                />
                            ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default MyComponent;