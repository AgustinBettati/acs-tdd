import * as React from 'react';
import {withRouter} from "react-router";
import {IErrors, IProps, IState} from "./types";
import {createCourse, getCourse, updateCourse} from "../../api";
import {
    Button,
    CircularProgress,
    Card,
    CardHeader,
    CardContent,
    CardActions,
} from '@material-ui/core';
import CssBaseline from "../CourseForm/courseForm";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

const styles = require('./updateForm.css');


class updateForm extends React.Component<IProps, IState> {

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
        isNew: false,
        isEditing: true,
        isCreating: false,
        isDeleteModalOpen: false,
    };

    componentDidMount() {
        const {match} = this.props;
        if (match.params.id) {
            // getCourse(match.params.id).then(this.handleResponse).then(this.receiveCourse);
            this.setState({isNew: false});
        } else {
            this.setState({isNew: true});
        }
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

        if (prop === 'id') {
            console.log(event.target.value);
            console.log(prop);

            // @ts-ignore
            getCourse(event.target.value).then((course) => {
                const promise = course.json();
                promise.then((course2: ICourse) => {

                    this.setState({
                        ...this.state,
                        fields: {
                            ...this.state.fields,
                            name: course2.name,
                            description: course2.description,
                            platform: course2.platform,
                            link: course2.link
                        }
                    })
                    // console.log(course2);
                });

            });


        } else {
            this.setState({
                ...this.state,
                fields: {
                    ...this.state.fields,
                    [prop]: event.target.value,
                },
            });
        }

    };

    handleSubmit = () => {
        if (this.validateAll()) {
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
        return value !== '' && value.includes('www.');
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
                <div className={styles.deleteButtonDiv}>
                    <Button
                        variant='contained'
                        color='secondary'
                    >
                        DELETE
                    </Button>
                </div>
            }
        </div>
    };

    render() {
        const {fields, errors, isCreating} = this.state;

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
                                        <CardContent>{this.renderTitle()}</CardContent>
                                    </Grid>
                                    <Grid item direction={'row'}>
                                        <CardContent>
                                            <form className={'form'}>
                                                <TextField
                                                    variant="outlined"
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    label="Id"
                                                    name="id"
                                                    id='course-id'
                                                    placeholder={'Enter the id of the course to update'}
                                                    value={fields.id}
                                                    error={errors.id}
                                                    onChange={this.handleChange('id')}
                                                />
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
                                                    placeholder={'Previous name'}
                                                />
                                                <TextField
                                                    variant="outlined"
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    label="Description"
                                                    name="description"
                                                    id='course-description'
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
                                                id='submit-button'
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

export default withRouter(updateForm);
