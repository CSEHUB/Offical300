import React from 'react';
import CourseItems from './CourseItems';
import "../static/css/style.css"

export default class CourseList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            // Array of items featured in list
            items: []
        };

        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }

    /**
     * Adds to the number of hours a week a course takes on average
     * @param  {string} course The name of the course
     */
    addNumHours(course, quarter) {
        // Get reference to firebase boolean
        var ref = this.props.db.database().ref('/Cape_2017/' + course);

        ref.on("value", (function(snapshot) {

            // Check whether course is offered in quarter specified
            if (!snapshot.hasChild(quarter)) {
                alert("WARNING!!!: The course ".concat(course)
                    .concat(" is usually not offered in the ").concat(quarter)
                    . concat(" quarter. Double check your course schedule!"));
            }

            // Get num of hours per week course should take
            // TODO: Optimize this
            snapshot.forEach((function(data) {
                if (quarter === data.key) {
                    this.props.timeChangeCallback(Math.round(Number(data.val()) * 100) / 100);
                }
            }).bind(this))
        }).bind(this));
    }

    /**
     * Removes number of hours from quarter component
     * @param  {string} course current course being checked
     * @param  {string} quarter quarter being checked
     */
    subNumHours(course, quarter) {
        var ref = this.props.db.database().ref('/Cape_2017/' + course);

        ref.on("value", (function(snapshot) {
            snapshot.forEach((function(data) {
                if (quarter === data.key) {
                    this.props.timeChangeCallback(-1 * Math.round(Number(data.val()) * 100) / 100);
                }
            }).bind(this))
        }).bind(this));
    }

    addItem(e) {

        // Check that empty string wasn't accidentally entered
        if (this._inputElement.value !== '') {

            // Create new item and add it to the state state
            var newItem = {
                text: this._inputElement.value,
                key: Date.now()
            };

            // Adjust the total number of hours per week
            //this.props.timeChangeCallback(this.getNumHours(this._inputElement.value));
            this.addNumHours(this._inputElement.value.toUpperCase(), this.props.qt);

            this.setState((prevState) => {
                return {
                    items: prevState.items.concat(newItem)
                };
            });

            // Reset input element
            this._inputElement.value = "";
        }

        console.log(this.state.items);
        e.preventDefault();
    }

    deleteItem(key) {
        var filteredItems = this.state.items.filter((function (item) {
            if (item.key === key) {
                this.subNumHours(item.text.toUpperCase(), this.props.qt);
            }

            return (item.key !== key);
        }).bind(this));

        this.setState({
            items: filteredItems
        });
    }


    componentDidUpdate() {
        localStorage.setItem(this.props.yr.concat(this.props.qt).concat("cl"), JSON.stringify(this.state));
    }

    componentDidMount() {
        const data = localStorage.getItem(this.props.yr.concat(this.props.qt).concat("cl"))
        if(data) {
            this.setState(prevState => {
                return JSON.parse(data)
            })
        }
    }

    render() {
        return(
            <div className="courseListMain">
                <div className="header">
                    <form onSubmit={this.addItem}>
                        <input className="plannerInput" ref={(a) => this._inputElement = a}
                               placeholder={this.props.qt.concat(" course")}>
                        </input>
                        <button className="plannerButton" type="submit">Add</button>
                    </form>
                </div>
                <CourseItems entries={this.state.items}
                             delete={this.deleteItem}/>
            </div>
        );
    }
}
