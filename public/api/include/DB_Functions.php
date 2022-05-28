<?php

class DB_Functions
{

    private $conn;

    public function __construct()
    {
        require_once 'DB_Connect.php';
        $db = new Db_Connect();
        $this->conn = $db->connect();
    }

    public function __destruct()
    {
    }

    ////////////////////////

    public function getTasks()
    {
        $stmt = $this->conn->prepare('SELECT * from tasks');
        if ($stmt->execute()) {
            $stmt->bind_result(
                $id,
                $text,
                $group,
                $dateCreated,
                $dateToBeCompleted,
                $taskCompletedTime,
                $quantity,
                $note,
                $isChecked,
                $timeDisplayType,
                $lastUpdated,
                $isExpanded
            );
            $rows = array();
            while ($r = mysqli_stmt_fetch($stmt)) {
                $task['id'] = $id;
                $task['text'] = $text;
                $task['group'] = $group;
                $task['dateCreated'] = $dateCreated;
                $task['dateToBeCompleted'] = $dateToBeCompleted;
                $task['taskCompletedTime'] = $taskCompletedTime;
                $task['quantity'] = $quantity;
                $task['note'] = $note;
                $task['isChecked'] = $isChecked;
                $task['timeDisplayType'] = $timeDisplayType;
                $task['lastUpdated'] = $lastUpdated;
                $task['isExpanded'] = $isExpanded;
                $rows[] = $task;
            }
            $stmt->close();
        }
        print json_encode($rows);
    }

    ////////////////////////

    public function getConfig()
    {
        $stmt = $this->conn->prepare('SELECT * from config LIMIT 1');

        if ($stmt->execute()) {
            $stmt->bind_result(
                $isDarkTheme
            );
            $rows = array();
            while ($r = mysqli_stmt_fetch($stmt)) {
                $config['isDarkTheme'] = $isDarkTheme;
            }
            $stmt->close();
        }
        print json_encode($config);
    }

    ////////////////////////

    public function toggleTheme($isDarkTheme)
    {
        $stmt = $this->conn->prepare('UPDATE config SET isDarkTheme = ?');
        $stmt->bind_param(
            's',
            $isDarkTheme
        );
        $result = $stmt->execute();
        $stmt->close();
    }

    ////////////////////////

    public function toggleExpanded($taskGroup, $isExpanded)
    {
        $stmt = $this->conn->prepare('UPDATE tasks SET isExpanded = ? WHERE taskGroup = ?');
        $stmt->bind_param(
            'ss',
            $isExpanded,
            $taskGroup
        );
        $result = $stmt->execute();
        $stmt->close();
    }

    ////////////////////////

    public function createTask(
        $id,
        $taskText,
        $taskGroup,
        $dateCreated,
        $dateToBeCompleted,
        $taskCompletedTime,
        $quantity,
        $note,
        $isChecked
    ) {
        $stmt = $this->conn->prepare('INSERT INTO tasks (id, taskText, taskGroup, dateCreated, dateToBeCompleted,taskCompletedTime, quantity, note, isChecked) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)');
        $stmt->bind_param(
            'sssssssss',
            $id,
            $taskText,
            $taskGroup,
            $dateCreated,
            $dateToBeCompleted,
            $taskCompletedTime,
            $quantity,
            $note,
            $isChecked
        );
        $result = $stmt->execute();
        $stmt->close();
    }

    ////////////////////////

    public function createTaskGroup(
        $id,
        $taskText,
        $taskGroup,
        $dateCreated,
        $dateToBeCompleted,
        $taskCompletedTime,
        $quantity,
        $note,
        $isChecked
    ) {
        $stmt = $this->conn->prepare('INSERT INTO tasks (id, taskText, taskGroup, dateCreated, dateToBeCompleted, taskCompletedTime, quantity, note, isChecked) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)');
        $stmt->bind_param(
            'sssssssss',
            $id,
            $taskText,
            $taskGroup,
            $dateCreated,
            $dateToBeCompleted,
            $taskCompletedTime,
            $quantity,
            $note,
            $isChecked
        );
        $result = $stmt->execute();
        $stmt->close();
    }

    ////////////////////////

    public function deleteTask($id)
    {
        $stmt = $this->conn->prepare('DELETE FROM tasks WHERE id = ?');
        $stmt->bind_param(
            's',
            $id
        );
        $result = $stmt->execute();
        $stmt->close();
    }

    ////////////////////////

    public function toggleTask($id, $state)
    {
        $stmt = $this->conn->prepare('UPDATE tasks SET isChecked = ?, lastUpdated = NOW() WHERE id = ?');
        $stmt->bind_param(
            'ss',
            $state,
            $id
        );
        $result = $stmt->execute();
        $stmt->close();
    }

    ////////////////////////

    public function renameTask($id, $value)
    {
        $stmt = $this->conn->prepare('UPDATE tasks SET taskText = ?, lastUpdated = NOW() WHERE id = ?');
        $stmt->bind_param(
            'ss',
            $value,
            $id
        );
        $result = $stmt->execute();
        $stmt->close();
    }

    ////////////////////////

    public function changeQuantity($id, $value)
    {
        $stmt = $this->conn->prepare('UPDATE tasks SET quantity = ?, lastUpdated = NOW() WHERE id = ?');
        $stmt->bind_param(
            'ss',
            $value,
            $id
        );
        $result = $stmt->execute();
        $stmt->close();
    }

    ////////////////////////

    public function updateNote($id, $value)
    {
        $stmt = $this->conn->prepare('UPDATE tasks SET note = ?, lastUpdated = NOW() WHERE id = ?');
        $stmt->bind_param(
            'ss',
            $value,
            $id
        );
        $result = $stmt->execute();
        $stmt->close();
    }

    ////////////////////////


    public function deleteGroup($taskGroup)
    {
        $stmt = $this->conn->prepare('DELETE FROM tasks WHERE taskGroup = ?');
        $stmt->bind_param(
            's',
            $taskGroup
        );
        $result = $stmt->execute();
        $stmt->close();
    }

    ////////////////////////

    public function renameGroup($id, $taskGroup)
    {
        $stmt = $this->conn->prepare('UPDATE tasks SET taskGroup = ?, lastUpdated = NOW() WHERE id = ?');
        $stmt->bind_param(
            'ss',
            $taskGroup,
            $id
        );
        $result = $stmt->execute();
        $stmt->close();
    }

    ////////////////////////

    public function selectAll($taskGroup)
    {
        $stmt = $this->conn->prepare('UPDATE tasks SET isChecked = 1, lastUpdated = NOW() WHERE taskGroup = ?');
        $stmt->bind_param(
            's',
            $taskGroup
        );
        $result = $stmt->execute();
        $stmt->close();
    }

    ////////////////////////

    public function selectNone($taskGroup)
    {
        $stmt = $this->conn->prepare('UPDATE tasks SET isChecked = 0, lastUpdated = NOW() WHERE taskGroup = ?');
        $stmt->bind_param(
            's',
            $taskGroup
        );
        $result = $stmt->execute();
        $stmt->close();
    }

    ////////////////////////

    public function updateDateToBeCompleted($id, $date, $type)
    {
        $stmt = $this->conn->prepare('UPDATE tasks SET dateCreated = NOW(), timeDisplayType = ?, dateToBeCompleted = ? , lastUpdated = NOW() WHERE id = ?');
        $stmt->bind_param(
            'sss',
            $type,
            $date,
            $id
        );
        $result = $stmt->execute();
        $stmt->close();
    }

    ////////////////////////

}
