import { Checkbox, FormControlLabel, Container, Typography, TextField, Button, Paper, Switch, Grid } from '@mui/material';
import { styled } from '@mui/system';

const MyContainer = styled(Container)(({ theme }) => ({
    border: '1px solid #ccc',
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
}));

const Header = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(1),
}));

const MyForm = styled('form')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
}));

interface CheckCardProps {
    title: string,
    parameters: {
        instances: Record<string, any>
        global?: Record<string, any>
    }
}

interface DynamicFormProps {
    data: Record<string, string | number | boolean>;
    onSubmit: (formData: Record<string, string | number | boolean>) => void;
}
function MountParamerts(props: CheckCardProps) {

    return (
        <Paper elevation={3} style={{ padding: '6px' }}>
            <Grid container spacing={2}>


            </Grid>
        </Paper>
    )
}
function CheckCard(props: CheckCardProps) {
    return (
        <MyContainer>
            <Header>
                <Typography variant="h6">{props.title}</Typography>
                <input
                    type="checkbox"
                    onChange={(e) => console.log(e.target.checked)}
                />
            </Header>
            <MyForm>
                {
                    Object.entries(props.parameters.instances).map(([key, value]) => (
                        <Grid item xs={12} sm={6} key={key}>
                            {typeof value === 'boolean' ? (
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={value}
                                            onChange={(e) =>
                                                // handleInputChange(key, e.target.checked)
                                                console.log(key, e.target.checked)
                                            }
                                        />
                                    }
                                    label={key}
                                />
                            ) : (
                                <TextField
                                    label={key}
                                    value={value}
                                    // onChange={(e) => handleInputChange(key, e.target.value)}
                                    fullWidth
                                    style={{ marginBottom: "5px" }}
                                />
                            )}
                        </Grid>
                    ))
                }
            </MyForm>
        </MyContainer>
    )
}
export default CheckCard;