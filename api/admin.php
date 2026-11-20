<?php
// Halaman admin: lihat RSVP & hapus ucapan. Buka: /api/admin.php
session_start();
require __DIR__.'/config.php';
if(isset($_POST['pass'])){ if(hash_equals(ADMIN_PASS,$_POST['pass'])){ $_SESSION['ok']=1; $_SESSION['t']=bin2hex(random_bytes(16)); } else $err='Password salah'; }
if(isset($_GET['out'])){ session_destroy(); header('Location: admin.php'); exit; }
function h($s){ return htmlspecialchars((string)$s,ENT_QUOTES,'UTF-8'); }
?><!DOCTYPE html><html lang="id"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Admin Undangan</title>
<style>body{font-family:system-ui,sans-serif;max-width:900px;margin:24px auto;padding:0 14px;color:#243B64}table{border-collapse:collapse;width:100%;margin:10px 0 30px}td,th{border:1px solid #D9DEE5;padding:6px 8px;text-align:left;font-size:14px}th{background:#f3f6fa}button,input{padding:7px 10px}</style></head><body>
<?php if(empty($_SESSION['ok'])): ?>
<h2>Masuk Admin</h2><?php if(!empty($err)) echo '<p style="color:#b04a4a">'.h($err).'</p>'; ?>
<form method="post"><input type="password" name="pass" placeholder="Password" required> <button>Masuk</button></form>
<?php else:
$pdo=db();
if(isset($_POST['del'],$_POST['t']) && hash_equals($_SESSION['t'],$_POST['t'])){ $pdo->prepare('DELETE FROM ucapan WHERE id=?')->execute([(int)$_POST['del']]); }
$r=$pdo->query('SELECT * FROM rsvp ORDER BY id DESC')->fetchAll();
$hadir=0; foreach($r as $x) if($x['kehadiran']==='Hadir') $hadir+=$x['jumlah'];
?>
<h2>RSVP <small>(total tamu hadir: <?=$hadir?>)</small> <a href="?out=1" style="font-size:14px">keluar</a></h2>
<table><tr><th>Waktu</th><th>Nama</th><th>Jumlah</th><th>Kehadiran</th><th>Pesan</th></tr>
<?php foreach($r as $x): ?><tr><td><?=h($x['created_at'])?></td><td><?=h($x['nama'])?></td><td><?=h($x['jumlah'])?></td><td><?=h($x['kehadiran'])?></td><td><?=h($x['pesan'])?></td></tr><?php endforeach; ?></table>
<h2>Ucapan</h2>
<table><tr><th>Waktu</th><th>Nama</th><th>Ucapan</th><th></th></tr>
<?php foreach($pdo->query('SELECT * FROM ucapan ORDER BY id DESC') as $x): ?><tr><td><?=h($x['created_at'])?></td><td><?=h($x['nama'])?></td><td><?=h($x['pesan'])?></td>
<td><form method="post" onsubmit="return confirm('Hapus ucapan ini?')"><input type="hidden" name="t" value="<?=h($_SESSION['t'])?>"><button name="del" value="<?=(int)$x['id']?>">Hapus</button></form></td></tr><?php endforeach; ?></table>
<?php endif; ?></body></html>
