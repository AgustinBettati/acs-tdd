import * as React from 'react';
import {Redirect, withRouter} from "react-router";
import {IErrors, IProps, IState} from "./types";
import { getCourse, updateCourse} from "../../api";
import {
    Button,
    CircularProgress,
    Card,
    CardContent,
    CardActions,
} from '@material-ui/core';
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import CardHeader from "@material-ui/core/CardHeader";

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
            this.obtainCourseAndSetState(match.params.id)
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
            this.obtainCourseAndSetState(event.target.value)
        }
        this.setState({
            ...this.state,
            fields: {
                ...this.state.fields,
                [prop]: event.target.value,
            },
        });
    };

    obtainCourseAndSetState(id: number){
        // @ts-ignore
        getCourse(id).then((course) => {
            const promise = course.json();
            promise.then((course2: ICourse) => {

                this.setState({
                    ...this.state,
                    fields: {
                        ...this.state.fields,
                        name: course2.name,
                        description: course2.description,
                        platform: course2.platform,
                        link: course2.link,
                        id: course2.id
                    }
                })
                // console.log(course2);
            })
                .catch(() => {
                    console.log('not found')
                });

        });
    }

    handleSubmit = () => {
        if (this.validateAll()) {
            updateCourse(this.state.fields).then(() => this.setState({redirect: '/home'}));
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
        switch (field) {
            case 'name':
                return (
                    this.validateName(value)
                );
            case 'description':
                return (
                    this.validateDescription(value)
                );
            case 'platform':
                return (
                    this.validatePlatform(value)
                );
            case 'link':
                return (
                    this.validateLink(value)
                );
            default:
                return true;
        }
    };

    private validateName(value: any) {
        return value !== undefined && value !== "";
    }

    private validatePlatform(value: any) {
        return ['Coursera', 'Udemy', 'edX', 'YouTube'].includes(value);
    }

    private validateDescription(value: any) {
        return value !== undefined && value !== "";
    }


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

    public Pifie(props) {
        if (props.hasError) {
            return (
                <div>
                    {props.msg}
                </div>
            )
        }
        return <div></div>
    }

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
                                                <this.Pifie hasError={errors.name} msg='Invalid name'/>
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
                                                <this.Pifie hasError={errors.description} msg='Invalid description'/>
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
                                                <this.Pifie hasError={errors.platform} msg='Invalid platform'/>
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
                                                <this.Pifie hasError={errors.link} msg='Invalid link'/>
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
