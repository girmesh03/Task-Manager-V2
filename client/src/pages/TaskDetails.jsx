import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import PropTypes from "prop-types";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import AddIcon from "@mui/icons-material/Add";

import { LoadingFallback } from "../components/LoadingFallback";
import MuiTextField from "../components/MuiTextField";
import MuiAutocomplete from "../components/MuiAutocomplete";
import MuiMobileDatePicker from "../components/MuiMobileDatePicker";

import { makeRequest } from "../api/apiRequest";

function TabPanel({ children, value, index, isNoneMobile, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box
          sx={{
            p: 0,
            display: isNoneMobile && index === 1 ? "flex" : "block",
            gap: 2,
          }}
        >
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  value: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  isNoneMobile: PropTypes.bool,
};

function a11yProps(index) {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  };
}

const ActivityForm = ({ control, isNoneMobile }) => {
  return (
    <Stack direction="column" spacing={2}>
      <MuiTextField
        name="action"
        control={control}
        placeholder="Add Your Action Here"
        rules={{ required: "Action is required" }}
      />
      <Stack spacing={2} direction={!isNoneMobile ? "column" : "row"}>
        <MuiAutocomplete
          name="performedBy"
          control={control}
          placeholder="Eg. John Doe"
          fullWidth
          rules={{ required: "Performed by is required" }}
        />
        <MuiMobileDatePicker
          name="timestamp"
          control={control}
          type="date"
          rules={{ required: "Timestamp is required" }}
        />
      </Stack>
      <MuiTextField
        name="notes"
        control={control}
        rules={{ required: "Notes are required" }}
        placeholder="Eg. Inspect Refrigerators"
        multiline
        rows={4}
      />
    </Stack>
  );
};

ActivityForm.propTypes = {
  control: PropTypes.object.isRequired,
  isNoneMobile: PropTypes.bool,
};

const TaskDetails = () => {
  const { id: taskId } = useParams();
  const [task, setTask] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [deletingActivityId, setDeletingActivityId] = useState(null);
  const theme = useTheme();
  const isLgUp = useMediaQuery(theme.breakpoints.up("lg"));

  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      action: "",
      performedBy: [],
      timestamp: "",
      notes: "",
    },
  });

  useEffect(() => {
    const fetchTask = async () => {
      try {
        setLoading(true);
        const response = await makeRequest.get(`/tasks/${taskId}`);
        setTask(response.data);
      } catch (err) {
        console.log(err.response.data.message || "Failed to load task data.");
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [taskId]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
    reset();
  };

  const confirmDeleteActivity = (activityId) => {
    setDeletingActivityId(activityId); // Open confirmation dialog
  };

  const cancelDeleteActivity = () => {
    setDeletingActivityId(null); // Close confirmation dialog
  };

  const deleteActivityItem = async () => {
    try {
      const updatedActivities = task.activities.filter(
        (activity) => activity._id !== deletingActivityId
      );
      const { data: updatedTask } = await makeRequest.put(`/tasks/${taskId}`, {
        ...task,
        activities: updatedActivities,
      });
      setTask(updatedTask);
    } catch (error) {
      console.error("Error updating task:", error);
    } finally {
      setDeletingActivityId(null); // Close confirmation dialog
    }
  };

  const onSubmit = async (data) => {
    try {
      const updatedActivities = [...task.activities, data];
      const { data: updatedTask } = await makeRequest.put(`/tasks/${taskId}`, {
        ...task,
        activities: updatedActivities,
      });
      setTask(updatedTask);

      if (isModalOpen) {
        toggleModal();
      } else {
        reset();
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <>
      {loading ? (
        <LoadingFallback />
      ) : (
        <>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              textColor="secondary"
              indicatorColor="secondary"
              aria-label="task detail tabs"
            >
              <Tab label="Detail" {...a11yProps(0)} />
              <Tab label="Activities" {...a11yProps(1)} />
            </Tabs>
            {tabValue === 1 && !isLgUp && (
              <Button
                variant="outlined"
                color="primary"
                size="small"
                startIcon={<AddIcon />}
                onClick={toggleModal}
                sx={{
                  display: { xs: "inline-flex", lg: "none" },
                  ml: "auto",
                }}
              >
                Add Activity
              </Button>
            )}
          </Stack>

          <TabPanel value={tabValue} index={0}>
            <Card variant="outlined" sx={{ p: 3, mb: 2 }}>
              <CardContent>
                <Typography variant="h4" gutterBottom>
                  {task.title}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Description:</strong> {task.description}
                </Typography>
                <Typography variant="body1" component="div">
                  <strong>Status:</strong>{" "}
                  <Chip label={task.status} color="success" />
                </Typography>
              </CardContent>
            </Card>
          </TabPanel>
          <TabPanel value={tabValue} index={1} isNoneMobile={isLgUp}>
            {task.activities.length > 0 ? (
              <Timeline position="alternate" sx={{ flex: 1, p: 0 }}>
                {task.activities.map((activity) => (
                  <TimelineItem key={activity._id}>
                    <TimelineSeparator>
                      <TimelineDot color="primary" />
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent sx={{ overflow: "hidden" }}>
                      <Typography
                        variant="body1"
                        sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
                      >
                        <strong>Action:</strong> {activity.action}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
                      >
                        <strong>Notes:</strong> {activity.notes}
                      </Typography>
                      <Button
                        color="error"
                        size="small"
                        onClick={() => confirmDeleteActivity(activity._id)}
                        sx={{ mt: 1 }}
                      >
                        Delete
                      </Button>
                    </TimelineContent>
                  </TimelineItem>
                ))}
              </Timeline>
            ) : (
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                sx={{ flex: 1, height: "50vh" }}
              >
                <Typography variant="body1">No activities yet</Typography>
              </Stack>
            )}

            {isLgUp && (
              <Box flex={1}>
                <Card
                  variant="outlined"
                  component="form"
                  noValidate
                  autoComplete="off"
                  onSubmit={handleSubmit(onSubmit)}
                  sx={{ p: 4 }}
                >
                  <Stack direction="column" spacing={2}>
                    <Typography variant="h6" textAlign="center">
                      New Activity
                    </Typography>
                    <ActivityForm control={control} isNoneMobile={isLgUp} />
                    <Button type="submit" color="primary" variant="contained">
                      Add Activity
                    </Button>
                  </Stack>
                </Card>
              </Box>
            )}
          </TabPanel>

          <Dialog
            open={isModalOpen}
            onClose={toggleModal}
            maxWidth="sm"
            fullWidth
            aria-labelledby="dialog-title"
            aria-describedby="dialog-description"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              "& .MuiPaper-root": {
                m: 1,
                width: "100%",
                "&.MuiDialog-paper": {
                  py: "1rem",
                  backgroundImage: "none",
                },
              },
            }}
          >
            <DialogTitle id="dialog-title">New Activity</DialogTitle>
            <DialogContent id="dialog-description" sx={{ p: 2 }}>
              <ActivityForm control={control} />
            </DialogContent>
            <DialogActions>
              <Button onClick={toggleModal} color="secondary">
                Cancel
              </Button>
              <Button type="submit" color="primary" variant="contained">
                Add Activity
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog
            open={Boolean(deletingActivityId)}
            onClose={cancelDeleteActivity}
            maxWidth="xs"
            fullWidth
          >
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogContent>
              <Typography>
                Are you sure you want to delete this activity?
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={cancelDeleteActivity} color="secondary">
                Cancel
              </Button>
              <Button
                onClick={deleteActivityItem}
                color="error"
                variant="contained"
              >
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </>
  );
};

export default TaskDetails;
