// DO NOT DELETE THIS file
// IT DOES NOTHING, BUT PROGRAM CRASHES IF IT'S MISSING
// STILL TRYING TO FIGURE OUT WHERE WHAT PARTS OF CODE DEPEND ON THIS

import React from 'react';

export default class Layout extends React.Component {
    render() {
        return (
            <div className="app-container">
                <header>
                </header>
                <div className="app-content">{this.props.children}</div>
                <footer>
                    <p>
                        This is a demo app.
                    </p>
                </footer>
            </div>
        );
    }
}
