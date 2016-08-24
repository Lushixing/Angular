<?php
$data = array(
	array(
		"id" => 1,
		"title" => "NBA体育新闻1",
		"writer" => "小名1",
		"date" => 1455808822088,
		"content" => "新闻内容1"
	),
	array(
		"id" => 2,
		"title" => "NBA体育新闻2",
		"writer" => "小名2",
		"date" => 1455808822088,
		"content" => "新闻内容2"
	),
	array(
		"id" => 3,
		"title" => "NBA体育新闻3",
		"writer" => "小名3",
		"date" => 1455808822088,
		"content" => "新闻内容3"
	),
	array(
		"id" => 4,
		"title" => "NBA体育新闻4",
		"writer" => "小名4",
		"date" => 1455808822088,
		"content" => "新闻内容4"
	),
	array(
		"id" => 5,
		"title" => "NBA体育新闻5",
		"writer" => "小名5",
		"date" => 1455808822088,
		"content" => "新闻内容5"
	)
);
$result = array(
	"errno" => 0,
	"data" => $data
);
echo json_encode($result);