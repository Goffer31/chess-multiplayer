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
	
	$round = 0;
	
	$sql = "UPDATE `round` set round='$round'";
	$result = $conn->query($sql);
	$sql = "DELETE FROM `szachy` WHERE id IS NOT NULL";
	$result = $conn->query($sql);
	
	$sql = "INSERT INTO `szachy` (`x`,`y`,`id`) VALUES (0,6,0)";
	$result = $conn->query($sql);

	$sql = "INSERT INTO `szachy` (`x`,`y`,`id`) VALUES (1,6,1)";
	$result = $conn->query($sql);
	$sql = "INSERT INTO `szachy` (`x`,`y`,`id`) VALUES (2,6,2)";
	$result = $conn->query($sql);
	$sql = "INSERT INTO `szachy` (`x`,`y`,`id`) VALUES (3,6,3)";
	$result = $conn->query($sql);
	$sql = "INSERT INTO `szachy` (`x`,`y`,`id`) VALUES (4,6,4)";
	$result = $conn->query($sql);
	$sql = "INSERT INTO `szachy` (`x`,`y`,`id`) VALUES (5,6,5)";
	$result = $conn->query($sql);
	$sql = "INSERT INTO `szachy` (`x`,`y`,`id`) VALUES (6,6,6)";
	$result = $conn->query($sql);
	$sql = "INSERT INTO `szachy` (`x`,`y`,`id`) VALUES (7,6,7)";
	$result = $conn->query($sql);
	
	$sql = "INSERT INTO `szachy` (`x`,`y`,`id`) VALUES (0,1,8)";
	$result = $conn->query($sql);
	$sql = "INSERT INTO `szachy` (`x`,`y`,`id`) VALUES (1,1,9)";
	$result = $conn->query($sql);
	$sql = "INSERT INTO `szachy` (`x`,`y`,`id`) VALUES (2,1,10)";
	$result = $conn->query($sql);
	$sql = "INSERT INTO `szachy` (`x`,`y`,`id`) VALUES (3,1,11)";
	$result = $conn->query($sql);
	$sql = "INSERT INTO `szachy` (`x`,`y`,`id`) VALUES (4,1,12)";
	$result = $conn->query($sql);
	$sql = "INSERT INTO `szachy` (`x`,`y`,`id`) VALUES (5,1,13)";
	$result = $conn->query($sql);
	$sql = "INSERT INTO `szachy` (`x`,`y`,`id`) VALUES (6,1,14)";
	$result = $conn->query($sql);
	$sql = "INSERT INTO `szachy` (`x`,`y`,`id`) VALUES (7,1,15)";	
	$result = $conn->query($sql);

	$sql = "INSERT INTO `szachy` (`x`,`y`,`id`) VALUES (0,7,16)";
	$result = $conn->query($sql);
	$sql = "INSERT INTO `szachy` (`x`,`y`,`id`) VALUES (7,7,17)";
	$result = $conn->query($sql);

	$sql = "INSERT INTO `szachy` (`x`,`y`,`id`) VALUES (0,0,18)";
	$result = $conn->query($sql);
	$sql = "INSERT INTO `szachy` (`x`,`y`,`id`) VALUES (7,0,19)";
	$result = $conn->query($sql);


	$sql = "INSERT INTO `szachy` (`x`,`y`,`id`) VALUES (1,7,20)";
	$result = $conn->query($sql);
	$sql = "INSERT INTO `szachy` (`x`,`y`,`id`) VALUES (6,7,21)";
	$result = $conn->query($sql);

	$sql = "INSERT INTO `szachy` (`x`,`y`,`id`) VALUES (1,0,22)";
	$result = $conn->query($sql);
	$sql = "INSERT INTO `szachy` (`x`,`y`,`id`) VALUES (6,0,23)";	
	$result = $conn->query($sql);

	
	$sql = "INSERT INTO `szachy` (`x`,`y`,`id`) VALUES (2,7,24)";
	$result = $conn->query($sql);
	$sql = "INSERT INTO `szachy` (`x`,`y`,`id`) VALUES (5,7,25)";
	$result = $conn->query($sql);

	$sql = "INSERT INTO `szachy` (`x`,`y`,`id`) VALUES (2,0,26)";
	$result = $conn->query($sql);
	$sql = "INSERT INTO `szachy` (`x`,`y`,`id`) VALUES (5,0,27)";
	$result = $conn->query($sql);


	$sql = "INSERT INTO `szachy` (`x`,`y`,`id`) VALUES (3,7,28)";
	$result = $conn->query($sql);
	$sql = "INSERT INTO `szachy` (`x`,`y`,`id`) VALUES (3,0,29)";
	$result = $conn->query($sql);

	$sql = "INSERT INTO `szachy` (`x`,`y`,`id`) VALUES (4,7,30)";
	$result = $conn->query($sql);
	$sql = "INSERT INTO `szachy` (`x`,`y`,`id`) VALUES (4,0,31)";
	$result = $conn->query($sql);
	
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
