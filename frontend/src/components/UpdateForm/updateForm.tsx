import * as React from 'react';
import {Redirect, withRouter} from "react-router";
import {IErrors, IProps, IState} from "./types";
import {createCourse, getCourse, updateCourse} from "../../api";
import {
    Button,
    CircularProgress,
    Typography,
    Card,
    CardHeader,
    CardContent,
    FormControl,
    Input,
    InputLabel,
    CardActions,
} from '@material-ui/core';

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
        const { match } = this.props;
        if (match.params.id) {
            // getCourse(match.params.id).then(this.handleResponse).then(this.receiveCourse);
            this.setState({ isNew: false});
        } else {
            this.setState({ isNew: true });
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

            // @ts-ignore
            getCourse(prop).then((course2 : ICourse) => {
                this.setState({
                    ...this.state,
                    fields: {
                        ...this.state.fields,
                        name: course2.name,
                        description:course2.description,
                        platform: course2.platform,
                        link:course2.link
                    }
                })
            });


        }
        else {
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
        const {fields, errors, isCreating, redirect} = this.state;

        if (redirect) {
            return <Redirect to={redirect}/>;
        }

        if (isCreating) {
            return <div><CircularProgress/></div>
        }

        return (
            <div className={styles.NewCourse}>
                <Typography className={styles['New-course-title']} color='textSecondary'>
                    {
                        this.getHeader()
                    }
                </Typography>
                <Card className={styles['New-course-box']}>
                    <CardHeader title={this.renderTitle()} className={styles.displayName}/>
                    <CardContent>
                        <form className={styles['New-course-form']}>

                            <FormControl className={styles['course-form-control']} error={errors.name}>
                                <InputLabel required htmlFor='admin-name'>Id</InputLabel>
                                <Input id='course-id'
                                       onChange={this.handleChange('id')}
                                       placeholder={'Enter the id of the course to update'}
                                />
                            </FormControl>
                            <FormControl className={styles['course-form-control']} error={errors.name}>
                                <InputLabel required htmlFor='admin-name'>Name</InputLabel>
                                <Input id='course-name'
                                       value={fields.name}
                                       onChange={this.handleChange('name')}
                                       placeholder={'previousName'}
                                />
                            </FormControl>
                            <FormControl className={styles['course-form-control']} error={errors.description}>
                                <InputLabel required htmlFor='course-description'>Description</InputLabel>
                                <Input id='course-description'
                                       value={fields.description}
                                       onChange={this.handleChange('description')}
                                />
                            </FormControl>
                            <FormControl className={styles['course-form-control']} error={errors.platform}>
                                <InputLabel required htmlFor='course-platform'>Platform</InputLabel>
                                <Input id='course-platform'
                                       value={fields.platform}
                                       onChange={this.handleChange('platform')}
                                />
                            </FormControl>
                            <FormControl className={styles['course-form-control']} error={errors.link}>
                                <InputLabel required htmlFor='course-link'>Link</InputLabel>
                                <Input id='course-link'
                                       value={fields.link}
                                       onChange={this.handleChange('link')}
                                />
                            </FormControl>
                        </form>
                    </CardContent>

                    <CardActions>
                        <div className={styles.buttonContainer}>
                            {
                                <Button
                                    variant='contained'
                                    color='primary'
                                    className={styles['create-admin-button']}
                                    onClick={this.handleSubmit}
                                >
                                    SAVE
                                </Button>
                            }
                        </div>
                    </CardActions>

                </Card>
            </div>

        );
    }
}

export default withRouter(updateForm);