<?php 
$arr = json_encode($_POST);
sendData($_POST);
?>


<?php
function sendData($user){
	$servername = "localhost";
	$username = "root";
	$password = "";
	$dbname = "mydb";	
	
	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);
	// Check connection
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	} 
	$t = time();
	$id = 0;
	$tspan = json_encode($t);
	$active = $user["Active"];
	$usr = $user["Username"];
	$sql = "SELECT * FROM `users` WHERE user like '$usr'";
	$result = $conn->query($sql);
	$move = $user["Move"];
	if ($result->num_rows > 0) {
		// output data of each row
		while($row = $result->fetch_assoc()) {
				$user = $row["user"];
				$tmspan = $row["timespan"];
				$id = $row["id"];
				$act = $row["active"];
				
		}
		$sql = "UPDATE `users` SET timespan='$tspan', active='$active'  WHERE id='$id'";
	} else {
		$sql = "INSERT INTO `users` (user, timespan, active) VALUES ('$usr', '$tspan', '$active')";
	}
	$result = $conn->query($sql);

	$arr = array();
	$i = 0;
	$sql = "SELECT * FROM `users` WHERE timespan > $tspan-300";
	$result = $conn->query($sql);
		if ($result->num_rows > 0) {
		// output data of each row
		while($row = $result->fetch_assoc()) {
				$user = $row["user"];
				$tmspan = $row["timespan"];
				$id = $row["id"];
				if($tspan - $tmspan > 30)
					$active = 0;
				else
					$active = $row["active"];
				$arr[$i]["User"] = $user;
				$arr[$i]["Timespan"] = $tmspan;
				$arr[$i]["Id"] = $id;
				$arr[$i]["Active"] = $active;
				$i = $i + 1;
		}
		$sql = "UPDATE `users` SET timespan='$tspan' WHERE id='$id'";
	} else {
		$sql = "INSERT INTO `users` (user, timespan) VALUES ('$usr', '$tspan')";
	}
	
	$sql = "SELECT * FROM `round`";
	$r = 0;
	$result = $conn->query($sql);
		if ($result->num_rows > 0) {
		// output data of each row
		while($row = $result->fetch_assoc()) {
				$r = $row["round"]+$move;
				$arr[0]["Round"] = $r;
		}
	}		
	$sql = "UPDATE `round` SET round='$r'";
	$result = $conn->query($sql);
	$conn->close();
	
	
	echo json_encode($arr);
}
?>
