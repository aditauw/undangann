<?php
require __DIR__.'/config.php';
header('Content-Type: application/json; charset=utf-8');
function clean($v,$n){ return mb_substr(trim(strip_tags((string)$v)),0,$n); }
try{
  $pdo=db();
  if($_SERVER['REQUEST_METHOD']==='POST'){
    $d=json_decode(file_get_contents('php://input'),true);
    if(!is_array($d)) $d=[];
    $nama=clean($d['n']??'',60);
    if($nama===''){ http_response_code(400); echo json_encode(['error'=>'nama kosong']); exit; }
    if(($d['type']??'')==='rsvp'){
      $hadir=($d['k']??'')==='Tidak Hadir'?'Tidak Hadir':'Hadir';
      $jml=max(1,min(10,(int)($d['j']??1)));
      $pdo->prepare('INSERT INTO rsvp (nama,jumlah,kehadiran,pesan) VALUES (?,?,?,?)')
          ->execute([$nama,$jml,$hadir,clean($d['p']??'',300)]);
    } else {
      $msg=clean($d['m']??'',300);
      if($msg===''){ http_response_code(400); echo json_encode(['error'=>'ucapan kosong']); exit; }
      $pdo->prepare('INSERT INTO ucapan (nama,pesan) VALUES (?,?)')->execute([$nama,$msg]);
    }
    echo json_encode(['ok'=>true]);
  } else {
    $rows=$pdo->query('SELECT nama AS n, pesan AS m, DATE_FORMAT(created_at,"%d/%m/%Y") AS d FROM (SELECT * FROM ucapan ORDER BY id DESC LIMIT 100) t ORDER BY id ASC')->fetchAll();
    echo json_encode($rows);
  }
}catch(Throwable $e){
  http_response_code(500); echo json_encode(['error'=>'server']);
}
