import * as React from "react";
import {Redirect, withRouter} from "react-router";
import {IProps, IStateHome} from "../UpdateForm/types";
import {getCourses} from "../../api";
import {TableHead} from "@material-ui/core";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import Typography from "@material-ui/core/Typography";
const styles = require('./courseTable.css');

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
        this.setState({redirect: '/update/' + id});
    }

    render() {
        const{courses, redirect} = this.state;

        if (redirect) {
            return <Redirect to={redirect}/>;
        }

        return(
            <div className={'paper'}>
                <Typography className={styles['Table-title']} color='textPrimary'>{
                    `Home`
                }</Typography>

                <Typography className={styles['Table-title']} color='textPrimary'>{
                    `Courses table`
                }</Typography>

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

                                            <IconButton onClick={() => this.handleEditCourse(row.id)}><Icon>edit_icon</Icon></IconButton>
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
