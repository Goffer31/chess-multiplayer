<?php 
	$arr = json_encode($_POST);
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
	
	$arr = array();
	$i = 0;
	$sql = "SELECT * FROM `szachy`";
	$result = $conn->query($sql);
		if ($result->num_rows > 0) {
		// output data of each row
		while($row = $result->fetch_assoc()) {
				$x = $row["x"];
				$y = $row["y"];
				$id = $row["id"];
				$arr[$i]["x"] = $x;
				$arr[$i]["y"] = $y;
				$arr[$i]["id"] = $id;
				$i = $i + 1;
		}
	} 
	$conn->close();
	
	echo json_encode($arr);
?>
