import React from 'react';

export default class CourseItems extends React.Component {
    constructor(props) {
        super(props);

        this.createCourses = this.createCourses.bind(this);
    }

    delete(key) {
        this.props.delete(key);
    }

    createCourses(item) {
        return <li onClick={() => this.delete(item.key)}
                   key={item.key}>{item.text}</li>
    }

    render() {
        var courseEntries = this.props.entries;
        var listItems = courseEntries.map(this.createCourses);

        return (
            <ul className="theList">
                {listItems}
            </ul>
        );
    }
}