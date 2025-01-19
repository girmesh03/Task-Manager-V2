import { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router";
import dayjs from "dayjs";
import { Stack, Button, Menu, MenuItem, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

import AddIcon from "@mui/icons-material/Add";
import DoneIcon from "@mui/icons-material/Done";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import PendingIcon from "@mui/icons-material/Pending";
import ListIcon from "@mui/icons-material/List";

import TaskCard from "../components/TaskCard";
import { makeRequest } from "../api/apiRequest";
import { LoadingFallback } from "../components/LoadingFallback";

const Tasks = () => {
  const { searchText, setSearchText, selectedDate, setSelectedDate } =
    useOutletContext();
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const fetchTasks = async () => {
      try {
        const response = await makeRequest.get("/tasks");
        setTasks(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  useEffect(() => {
    const filtered = tasks.filter((task) => {
      let isValid = true;
      if (statusFilter && task.status !== statusFilter) {
        isValid = false;
      }
      if (
        searchText &&
        !task.title.toLowerCase().includes(searchText.toLowerCase())
      ) {
        isValid = false;
      }
      if (
        selectedDate &&
        dayjs(task.date).format("YYYY-MM-DD") !== selectedDate
      ) {
        isValid = false;
      }
      return isValid;
    });
    setFilteredTasks(filtered);
  }, [tasks, statusFilter, searchText, selectedDate]);

  const handleClearFilters = () => {
    setStatusFilter("");
    setSearchText("");
    setSelectedDate(null);
  };

  const handleMenuOpen = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleStatusSelect = (status) => {
    setStatusFilter(status);
    handleMenuClose();
  };

  return (
    <Stack direction="column" spacing={2} sx={{ pb: 0 }}>
      {loading ? (
        <LoadingFallback height="70vh" />
      ) : (
        <>
          <Stack
            direction="row"
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
              px: 2,
            }}
          >
            <Stack direction="row" spacing={1}>
              <Button
                size="small"
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={() => navigate("/tasks/create")}
              >
                Add Task
              </Button>
              {filteredTasks.length !== tasks.length && (
                <Button
                  size="small"
                  variant="outlined"
                  onClick={handleClearFilters}
                  sx={{ ml: 2 }}
                >
                  Clear Filters
                </Button>
              )}
            </Stack>

            <div>
              <Button
                variant="outlined"
                onClick={handleMenuOpen}
                startIcon={<ListIcon />}
              >
                Status
              </Button>
              <Menu
                anchorEl={menuAnchor}
                open={Boolean(menuAnchor)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={() => handleStatusSelect("")}>
                  <Typography>
                    <em>All</em>
                  </Typography>
                </MenuItem>
                <MenuItem onClick={() => handleStatusSelect("Completed")}>
                  <DoneIcon sx={{ mr: 1 }} />
                  Completed
                </MenuItem>
                <MenuItem onClick={() => handleStatusSelect("In Progress")}>
                  <HourglassEmptyIcon sx={{ mr: 1 }} />
                  In Progress
                </MenuItem>
                <MenuItem onClick={() => handleStatusSelect("Pending")}>
                  <PendingIcon sx={{ mr: 1 }} />
                  Pending
                </MenuItem>
                <MenuItem onClick={() => handleStatusSelect("To Do")}>
                  <ListIcon sx={{ mr: 1 }} />
                  To Do
                </MenuItem>
              </Menu>
            </div>
          </Stack>
          <Grid container spacing={2}>
            {filteredTasks.map((task) => (
              <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={task._id}>
                <TaskCard task={task} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Stack>
  );
};

export default Tasks;
