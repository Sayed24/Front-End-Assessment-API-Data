import React, { useState } from 'react';
import { Collapse } from 'reactstrap';

export const Student = (props) => {
    //toggle open close grades
    //get average
    //add tags
    const [tags, setTags] = useState([]);
    const [open, setOpen] = useState(false);

    const handleToggle = () => setOpen(!open);

    const getGradeAverage = (array) => {
        let sum = 0;
        let average = 0;

        for (let i = 0; i < array.length; i++) {
            array[i] = parseInt(array[i]);
            sum += array[i];
            average = sum / 8;  //Shoud we divide by 8 or array.length?
        }
        return average;
    };

    const addTags = (e) => {
        if ((e.key === 'Enter' && e.target.value !== null) || undefined || '') {
            setTags([...tags, e.target.value]);
            e.target.value = '';
        }
    };



    return (
        <div className='student-items' key={props.id}>
            <div className='student-div'>
                <div>
                    <img
                        className='student-pic'
                        src={props.pic}
                        alt={`Pic for Student ${props.id}`}
                    />
                </div>
                <div className='student-data'>
                    <li>
                        <h1>
                            {props.firstName}&nbsp;{props.lastName}
                        </h1>
                    </li>
                    <div className='student-info'>
                        <li>
                            <strong>Email: </strong> {props.email}
                        </li>
                        <li>
                            <strong>Company: </strong> {props.company}
                        </li>
                        <li>
                            <strong>Skill: </strong> {props.skill}
                        </li>
                        <li>
                            <strong>Average: </strong> {getGradeAverage(props.grades)}%
                        </li>

                        <div className='student-tags'>
                            {tags.map((tag) => (
                                <span className='student-tag-item'>  {tag} </span>
                            ))}
                        </div>

                        {/* rendering collapse data and set them to hide */}
                        <Collapse isOpen={open}>
                            <ol>
                                <li>Test 1: &nbsp; {props.grades[0]}%</li>
                                <li>Test 2: &nbsp; {props.grades[1]}%</li>
                                <li>Test 3: &nbsp; {props.grades[2]}%</li>
                                <li>Test 4: &nbsp; {props.grades[3]}%</li>
                                <li>Test 5: &nbsp; {props.grades[4]}%</li>
                                <li>Test 6: &nbsp; {props.grades[5]}%</li>
                                <li>Test 7: &nbsp; {props.grades[6]}%</li>
                                <li>Test 8: &nbsp; {props.grades[7]}%</li>
                            </ol>
                        </Collapse>

                        {/* adding tag input */}
                        <div className='student-grades'>
                            <input
                                type='text'
                                onKeyUp={(e) => e.key === 'Enter' && addTags(e)}
                                placeholder='Add a tag'
                                className='student-tag'
                            />
                            {/* <input type="text" value={value} onChange={handleChange} onKeyPress={handleKeypress} onClick={handleSubmit} placeholder="Add a tag" className='student-tag' /> */}
                        </div>
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