import React, { useState } from 'react';
import { Collapse } from 'reactstrap';
import StudentTag from './StudentTag';
export const Student = ({ key, pic, firstName, lastName, email, company, skill, grades, tags, addTag, id }) => {

    const [tagInput, setTagInput] = useState('');
    const [open, setOpen] = useState(false);

    const handleToggle = () => setOpen(!open);

    const getGradeAverage = (array) => {
        let sum = 0;
        let average = 0;

        for (let i = 0; i < array.length; i++) {
            array[i] = parseInt(array[i]);
            sum += array[i];
            average = sum / array.length;
        }
        return average;
    };

    // get all students tags
    const studentTags = tags.map((tag, index) => (<StudentTag tag={tag} key={index} />));

    // handle tag for submission, calls addTag from Application component
    const onTagSubmit = (e) => {
        e.preventDefault()
        addTag(tagInput, id)
        setTagInput('')
    }

    return (
        <div className='student-items' key={key}>
            <div className='student-div'>
                <div>
                    <img
                        className='student-pic'
                        src={pic}
                        alt={`Pic for Student ${key}`}
                    />
                </div>
                <div className='student-data'>
                    <li>
                        <h1>
                            {firstName}&nbsp;{lastName}
                        </h1>
                    </li>
                    <div className='student-info'>
                        <li>
                            <strong>Email: </strong> {email}
                        </li>
                        <li>
                            <strong>Company: </strong> {company}
                        </li>
                        <li>
                            <strong>Skill: </strong> {skill}
                        </li>
                        <li>
                            <strong>Average: </strong> {getGradeAverage(grades)}%
                        </li>


                        {/* rendering collapse data and set them to hide */}
                        <Collapse isOpen={open}>
                            <ol>
                                <li>Test 1: &nbsp; {grades[0]}%</li>
                                <li>Test 2: &nbsp; {grades[1]}%</li>
                                <li>Test 3: &nbsp; {grades[2]}%</li>
                                <li>Test 4: &nbsp; {grades[3]}%</li>
                                <li>Test 5: &nbsp; {grades[4]}%</li>
                                <li>Test 6: &nbsp; {grades[5]}%</li>
                                <li>Test 7: &nbsp; {grades[6]}%</li>
                                <li>Test 8: &nbsp; {grades[7]}%</li>
                            </ol>
                        </Collapse>

                        <div>
                            {studentTags}
                        </div>

                        {/* adding tag input */}
                        <form onSubmit={onTagSubmit} className='student-grades'>
                            <input
                                type='search'
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                placeholder='Add a tag'
                                className='student-tag'
                            />
                        </form>
                    </div>
                </div>
            </div>

            {/* + icon for collapse button */}
            <div className='button-col'>
                <button
                    type='button'
                    class='btn btn-secondary ms-5 my-5'
                    onClick={handleToggle}
                >
                    {!open ? '+' : '-'}
                </button>
            </div>
        </div>
    );
};
