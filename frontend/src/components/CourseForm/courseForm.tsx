import * as React from 'react';
import {Redirect, withRouter} from "react-router";
import {IProps, IState} from "./types";
import {createCourse, updateCourse} from "../../api";
import {
    Button,
    CircularProgress,
} from '@material-ui/core';
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import {IErrors} from "../UpdateForm/types";

class courseForm extends React.Component<IProps, IState> {

    state: IState = {
        fields: {
            name: '',
            description: '',
            platform: '',
            link: '',
            id: '',
        },
        showPassword: false,
        errors: {
            name: false,
            description: false,
            platform: false,
            link: false,
        },
        isNew: true,
        isEditing: true,
        isCreating: false,
        isDeleteModalOpen: false,
    };

    componentDidMount() {
        this.setState({isNew: true});
    }

    redirect = () => {
        this.setState({redirect: '/'});
    };

    handleResponse = (response: Response): Promise<ICourse> => {
        if (response.status === 404) {
            throw Error('Course not created');
        }

        return response.json();
    };

    setCourse = (course: ICourse) => {
        this.setState({
            fields: course,
            isNew: false,
            isEditing: false
        });
        this.mapCourse();
    };

    mapCourse = () => {
        const {course} = this.state;

        if (!course) {
            return;
        }

        const {name, description, id, platform, link} = course;
        this.setState({
            ...this.state,
            fields: {
                ...this.state.fields,
                name,
                description,
                platform,
                link,
                id,
            },
        });
    };

    handleChange = (prop: string) => (event: any) => {
        this.setState({
            ...this.state,
            fields: {
                ...this.state.fields,
                [prop]: event.target.value,
            },
        });
    };

    handleSubmit = () => {
        if(this.validateAll()){
            if (!this.state.isNew) {
                updateCourse(this.state.fields).then(() => this.setState({redirect: '/'}));
            } else {
                createCourse(this.state.fields).then(() => this.setState({redirect: '/home'}));
            }
        }
    };

    validateAll = () => {
        const errors: IErrors = {};

        /* Validate all fields and set errors */
        const results: boolean[] = Object.keys(this.state.fields).map((field) => {
            const isValid = this.validate(field, this.state.fields[field]);
            errors[field] = !isValid;
            return isValid;
        });
        const reduce = results.reduce(this.checkBooleans, true);
        /* Update error state */
        this.setState({
            ...this.state,
            errors: errors,
        });
        return reduce;
    };

    checkBooleans = (acc: boolean, elem: boolean) => {
        return acc && elem
    };

    validate = (field: string, value: any): boolean => {
        if (field === 'link') {
            return (
                this.validateLink(value)
            );
        } else {
            return true;
        }
    };

    validateLink = (value: any): boolean => {
        const regexp =  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
        if (regexp.test(value)) {
            return true;
        } else {
            return false;
        }
    };

    getHeader = () => {
        if (this.state.isNew) {
            return 'Create course';
        } else {
            return 'Edit course';
        }
    };

    renderTitle = () => {
        const {isNew} = this.state;
        return <div>
            {
                !isNew &&
                <div className={'delete-button'}>
                    <Button
                        variant='contained'
                        color='secondary'
                    >
                        Delete
                    </Button>
                </div>
            }
        </div>
    };

    render() {
        const {fields, errors, isCreating, redirect} = this.state;

        if (redirect) {
            return <Redirect to={redirect}/>;
        }

        if (isCreating) {
            return <div><CircularProgress/></div>
        }

        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div className={'paper center-content'}>
                    <Grid container direction={'row'}>
                        <Grid item direction={'column'}>
                        </Grid>
                        <Grid item direction={'column'}>
                            <Card className={'new-course'}>
                                <Grid container>
                                    <Grid item direction={'row'}>
                                        <CardHeader className={'center-content'} title={this.getHeader()} />
                                    </Grid>
                                    <Grid item direction={'row'}>
                                        <CardContent>
                                            <form className={'form'}>
                                                <TextField
                                                    variant="outlined"
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    label="Name"
                                                    name="name"
                                                    id='course-name'
                                                    value={fields.name}
                                                    error={errors.name}
                                                    onChange={this.handleChange('name')}
                                                />
                                                <TextField
                                                    variant="outlined"
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    label="Description"
                                                    name="description"
                                                    id='description'
                                                    value={fields.description}
                                                    error={errors.description}
                                                    onChange={this.handleChange('description')}
                                                />
                                                <TextField
                                                    variant="outlined"
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    label="Platform"
                                                    name="platform"
                                                    id='course-platform'
                                                    value={fields.platform}
                                                    error={errors.platform}
                                                    onChange={this.handleChange('platform')}
                                                />
                                                <TextField
                                                    variant="outlined"
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    label="Link"
                                                    name="link"
                                                    id='course-link'
                                                    value={fields.link}
                                                    error={errors.link}
                                                    onChange={this.handleChange('link')}
                                                />
                                            </form>
                                        </CardContent>
                                    </Grid>
                                    <Grid item direction={'row'}>
                                        <CardActions>
                                            <Button
                                                variant='contained'
                                                color='primary'
                                                className={'save-button'}
                                                onClick={this.handleSubmit}
                                            >
                                                Save
                                            </Button>
                                        </CardActions>
                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid>
                        <Grid item direction={'column'}>
                        </Grid>
                    </Grid>
                </div>
            </Container>
        );
    }
}

export default withRouter(courseForm);
