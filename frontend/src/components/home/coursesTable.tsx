import * as React from "react";
import {withRouter} from "react-router";
import {IProps, IStateHome} from "../UpdateForm/types";
import {getCourses} from "../../api";
import {TableHead} from "@material-ui/core";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import IconButton from "@material-ui/core/IconButton";

class coursesTable extends React.Component<IProps, IStateHome> {

    state: IStateHome = {
        courses: [],
    };

    componentDidMount() {
        getCourses().then(this.handleResponse).then(this.receiveCourses);
    }

    handleResponse = (response: Response): Promise<ICourse[]> => {
        if (response.status !== 200) {
            throw Error('Error fetching admins');
        }

        return response.json();
    };

    receiveCourses = (courses: ICourse[]) => {
        this.setState({courses})
    };

    private handleEditCourse(id: string) {
        return undefined;
    }

    render() {
        const{courses} = this.state;
        return(
            <div>
                <h1>Home</h1>

                <h3>Courses table</h3>

                <table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Platform</TableCell>
                            <TableCell>Link</TableCell>
                            <TableCell/>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            courses.map(row => {
                                return (
                                    <TableRow key={row.id}>
                                        <TableCell>{row.name}</TableCell>
                                        <TableCell>{row.platform}</TableCell>
                                        <TableCell>{row.link}</TableCell>
                                        <TableCell>
                                            {/*<Link to={`/admin/${row.id}`}>*/}
                                            {/*    <IconButton>*/}
                                            {/*        <Edit/>*/}
                                            {/*    </IconButton>*/}
                                            {/*</Link>*/}
                                            <IconButton onClick={() => this.handleEditCourse(row.id)}>EDIT</IconButton>
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        }

                    </TableBody>
                </table>
            </div>
        );
    }
}

export default withRouter(coursesTable);
