import PropTypes from "prop-types";
import { useNavigate } from "react-router";
import dayjs from "dayjs"; // Importing dayjs
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Stack,
  Chip,
  CardActions,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";

const TaskCard = ({ task }) => {
  // Formatting the date to a more readable format using dayjs
  const formattedDate = dayjs(task.date).format("MMM DD, YYYY");
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        borderRadius: 2,
        boxShadow: 3,
        pb: 1,
        backgroundColor: "background.paper", // Lighter background for better contrast
        transition: "transform 0.3s ease-in-out", // Hover animation effect
        height: "100%",
        display: "flex",
        flexDirection: "column",
        "&:hover": {
          transform: "scale(1.03)",
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        {/* Title and Description */}
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {task.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {task.description}
        </Typography>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          {/* Date */}
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {formattedDate}
          </Typography>
          {/* Priority Indicator */}
          <Chip
            label={task.priority}
            color={
              task.priority === "High"
                ? "error"
                : task.priority === "Medium"
                ? "warning"
                : "primary"
            }
            size="small"
            sx={{
              fontWeight: "bold",
              textTransform: "capitalize", // Priority text should be capitalized
            }}
          />
        </Stack>

        {/* Status and Assigned User */}
        <Typography
          component="h6"
          variant="body2"
          sx={{ fontWeight: "bold" }}
          gutterBottom
        >
          Status:{" "}
          <Chip
            label={task.status}
            color={task.status === "Completed" ? "success" : "warning"}
            size="small"
            sx={{
              fontWeight: "medium",
              textTransform: "capitalize", // Ensuring status is in proper case
            }}
          />
        </Typography>
        <Typography component="h6" variant="body2">
          Assigned to:{" "}
          {task.assignedTo.map((user) => user.firstName).join(", ")}
        </Typography>
      </CardContent>

      {/* Action Buttons */}
      <CardActions
        disableSpacing
        sx={{
          direction: "row",
          alignItems: "center",
          justifyContent: "flex-end",
          alignSelf: "flex-end",
        }}
      >
        <Tooltip title="View Task" arrow>
          <IconButton
            onClick={() => navigate(`/tasks/${task._id}`)}
            sx={{ border: "none" }}
          >
            <VisibilityIcon sx={{ color: "primary.main" }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Update Task" arrow>
          <IconButton
            onClick={() => navigate(`/tasks/${task._id}/update`)}
            sx={{ border: "none" }}
          >
            <EditIcon sx={{ color: "secondary.main" }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete Task" arrow>
          <IconButton
            onClick={() => console.log("Delete Task")}
            sx={{ border: "none" }}
          >
            <DeleteIcon sx={{ color: "error.main" }} />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

TaskCard.propTypes = {
  task: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    priority: PropTypes.string.isRequired, // High, Medium, Low
    assignedTo: PropTypes.arrayOf(PropTypes.object).isRequired,
    date: PropTypes.string.isRequired,
  }).isRequired,
};

export default TaskCard;
