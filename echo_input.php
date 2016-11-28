
<?php 
send($_POST);
function send($arr){
	$arr = $_POST;
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

	$x = $arr['X'];
	$y = $arr["Y"];
	$id = $arr["Id"];
	$x2 = $arr["X2"];
	$y2 = $arr["Y2"];
	$id2 = $arr["Id2"];
	
	$sql = "UPDATE `szachy` SET x='$x', y='$y' WHERE id='$id'";
	$result = $conn->query($sql);
	
	if($id2 != 32)
	{
		$sql = "UPDATE `szachy` SET x='$x2', y='$y2' WHERE id='$id2'";
		$result = $conn->query($sql);
	}
	
	$r = 0;
	$sql = "SELECT * FROM `round`";
	$result = $conn->query($sql);
		if ($result->num_rows > 0) {
		while($row = $result->fetch_assoc()) {
				$r = $row["round"]+1;
		}
	}		
	
	$sql = "UPDATE `round` SET round='$r'";
	$result = $conn->query($sql);

	$conn->close();
	
	echo json_encode($arr);
}
?>
