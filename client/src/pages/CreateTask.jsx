import { useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  MenuItem,
  Menu,
  ListItemIcon,
  ListItemText,
  Typography,
  Stack,
  Paper,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import HighPriorityIcon from "@mui/icons-material/PriorityHigh";
import MediumPriorityIcon from "@mui/icons-material/ImportExport";
import LowPriorityIcon from "@mui/icons-material/ArrowDownward";
import ListIcon from "@mui/icons-material/List";

import MuiTextField from "../components/MuiTextField";
import MuiAutocomplete from "../components/MuiAutocomplete";

import { makeRequest } from "../api/apiRequest";
import MuiMobileDatePicker from "../components/MuiMobileDatePicker";

const CreateTask = () => {
  const [statusAnchorEl, setStatusAnchorEl] = useState(null);
  const [priorityAnchorEl, setPriorityAnchorEl] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");
  const navigate = useNavigate();

  const { handleSubmit, control, reset, setValue } = useForm({
    defaultValues: {
      date: "",
      location: "",
      title: "",
      description: "",
      status: "", // menu of Completed, In Progress, Pending
      priority: "", // menu of High, Medium, Low
      assignedTo: [],
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await makeRequest.post("/tasks", {
        ...data,
        status: selectedStatus || "To Do",
        priority: selectedPriority || "Low",
      });
      console.log("Task created successfully:", response.data);
      reset();
      setSelectedStatus("");
      setSelectedPriority("");
      navigate("/tasks", { replace: true });
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const handleStatusClick = (event) => setStatusAnchorEl(event.currentTarget);
  const handlePriorityClick = (event) =>
    setPriorityAnchorEl(event.currentTarget);
  const handleStatusSelect = (status) => {
    setSelectedStatus(status);
    setValue("status", status);
    setStatusAnchorEl(null);
  };
  const handlePrioritySelect = (priority) => {
    setSelectedPriority(priority);
    setValue("priority", priority);
    setPriorityAnchorEl(null);
  };

  return (
    <Box>
      <Paper
        variant="outlined"
        sx={{ maxWidth: 600, width: "100%", mx: "auto" }}
      >
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Typography
            variant="h6"
            sx={{ py: 2, px: 3, borderBottom: 1, borderColor: "divider" }}
          >
            Create Task
          </Typography>

          <Grid container spacing={2} sx={{ px: 2.5, py: 1.5 }}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Stack direction="column" justifyContent="center" spacing={1}>
                <Typography variant="body1" sx={{ color: "text.secondary" }}>
                  Assigned To
                </Typography>
                <MuiAutocomplete
                  name="assignedTo"
                  control={control}
                  rules={{ required: "At least one user must be assigned" }}
                  fullWidth
                />
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
             <Stack direction="column" justifyContent="center" spacing={1}>
                <Typography variant="body1" sx={{ color: "text.secondary" }}>
                  Date
                </Typography>
                <MuiMobileDatePicker
                  name="date"
                  control={control}
                  rules={{ required: "Date is required" }}
                  // type="date"
                />
              </Stack>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FormControl fullWidth>
                <FormLabel htmlFor="title">Title</FormLabel>
                <MuiTextField
                  name="title"
                  control={control}
                  rules={{ required: "Title is required" }}
                  placeholder="Eg. Inspect Refrigerators"
                />
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth>
                <FormLabel htmlFor="location">location</FormLabel>
                <MuiTextField
                  name="location"
                  control={control}
                  rules={{ required: "Location is required" }}
                  placeholder="Eg. Inspect Refrigerators"
                />
              </FormControl>
            </Grid>
            <Grid size={{ xs: 6, sm: 3 }}>
              <Stack direction="column" justifyContent="center" spacing={1}>
                <Typography variant="body1" sx={{ color: "text.secondary" }}>
                  Priority
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Button
                    endIcon={<ArrowDropDownIcon />}
                    onClick={handlePriorityClick}
                    variant="outlined"
                    fullWidth
                    size="small"
                  >
                    {selectedPriority || "Priority"}
                  </Button>
                  <Menu
                    anchorEl={priorityAnchorEl}
                    open={Boolean(priorityAnchorEl)}
                    onClose={() => setPriorityAnchorEl(null)}
                  >
                    <MenuItem onClick={() => handlePrioritySelect("High")}>
                      <ListItemIcon>
                        <HighPriorityIcon />
                      </ListItemIcon>
                      <ListItemText>High</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={() => handlePrioritySelect("Medium")}>
                      <ListItemIcon>
                        <MediumPriorityIcon />
                      </ListItemIcon>
                      <ListItemText>Medium</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={() => handlePrioritySelect("Low")}>
                      <ListItemIcon>
                        <LowPriorityIcon />
                      </ListItemIcon>
                      <ListItemText>Low</ListItemText>
                    </MenuItem>
                  </Menu>
                </Box>
              </Stack>
            </Grid>
            <Grid size={{ xs: 6, sm: 3 }}>
              <Stack direction="column" justifyContent="center" spacing={1}>
                <Typography variant="body1" sx={{ color: "text.secondary" }}>
                  Status
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Button
                    endIcon={<ArrowDropDownIcon />}
                    onClick={handleStatusClick}
                    variant="outlined"
                    fullWidth
                    size="small"
                  >
                    {selectedStatus || "Status"}
                  </Button>
                  <Menu
                    anchorEl={statusAnchorEl}
                    open={Boolean(statusAnchorEl)}
                    onClose={() => setStatusAnchorEl(null)}
                  >
                    <MenuItem onClick={() => handleStatusSelect("Completed")}>
                      <ListItemIcon>
                        <CheckCircleIcon />
                      </ListItemIcon>
                      <ListItemText>Completed</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={() => handleStatusSelect("In Progress")}>
                      <ListItemIcon>
                        <HourglassEmptyIcon />
                      </ListItemIcon>
                      <ListItemText>In Progress</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={() => handleStatusSelect("Pending")}>
                      <ListItemIcon>
                        <PendingActionsIcon />
                      </ListItemIcon>
                      <ListItemText>Pending</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={() => handleStatusSelect("To Do")}>
                      <ListItemIcon>
                        <ListIcon />
                      </ListItemIcon>
                      <ListItemText>To Do</ListItemText>
                    </MenuItem>
                  </Menu>
                </Box>
              </Stack>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FormControl fullWidth>
                <FormLabel htmlFor="description">Description</FormLabel>
                <MuiTextField
                  name="description"
                  placeholder="Eg. Check and repair refrigerators in the main kitchen."
                  control={control}
                  rules={{ required: "Description is required" }}
                  multiline
                  rows={4}
                />
              </FormControl>
            </Grid>
          </Grid>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
            spacing={2}
            sx={{ px: 2, py: 1.5, borderTop: 1, borderColor: "divider" }}
          >
            <Button
              onClick={() => navigate(-1, { replace: true })}
              color="secondary"
            >
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Create
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default CreateTask;
