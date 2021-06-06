$(function(){

	var videoplayer = $('video#videoplayer'); // ID'si video player olan video etiketini seç.
	var video = videoplayer[0]; // video player değişkenin sıfırıncı değerini al. (Jquery ile çalışmak için bu şekilde sıfırıncı değeri almalıyız)

	function toplamSureBul(parametre=false) {  // Verilen parametrenin (dakika:saniye) olarak süresini bulma.
		if(parametre == false)  // Eğer parametre false ise.
		{
			var toplamSure = video.duration;  // Video uzunluğunu toplamSure değişkenine aktar.
		}else
		{
			var toplamSure = video.currentTime; // Video anlık zamanını toplamSure değişkenine aktar.
		}
		saniye = Math.floor(toplamSure);  // Saniye olarak bul ve tam sayıya yuvarla.
		dakika = Math.floor(toplamSure/60); // Dakika olarak bul ve tam sayıya yuvarla.
		saniye = Math.floor(saniye % 60); // Saniye.
		dakika = dakika < 10 ? "0"+dakika : dakika; 
		saniye = saniye < 10 ? "0"+saniye : saniye;
		return dakika+":"+saniye;
	}

	video.oncanplay = function() {  // Video hazır olduğu zaman.
    	$('span.sure').text( toplamSureBul(true)+" / "+toplamSureBul() ); // Class'ı süre olan span'a toplam süre fonksiyonundan gelen değeri aktar.
	};

	$('button.baslat').on("click",function(){  // Başlat butonuna tıklandığı zaman.
		if(video.paused) // Eğer video çalıştırılırsa.
		{
			$(this).html('<i class="fa fa-pause" aria-hidden="true"></i>'); // Butona pause ikonu ekle.
			video.play();  // Videoyu çalıştır
		}else 
		{
			$(this).html('<i class="fa fa-play" aria-hidden="true"></i>');  // Butona play ikonu ekle.
			video.pause(); // Videoyu durdur.
		}
		
	});

	video.ontimeupdate = function()  // Videonun her çalıştığı süre boyunca.
	{
		video_sure();  // video_sure fonksiyonunu çalıştır.
	}

	function video_sure()  // Bu fonksiyon ile her saniye video süre çubuğu ve zaman bilgisi yazan yerler güncellenecek.
	{ 
		var video_suan=video.currentTime * (100 / video.duration);  // Videonun şuanki zamanını bul.
		$('input.video_sure').val(video_suan);  // Class'ı video_sure olan inputun değerini video_suan değişkenine eşitle.
		$('span.sure').text( toplamSureBul(true)+" / "+toplamSureBul() ); // Her saniye boyunca class'ı süre olan span'ın değerini güncelle.
	}

	video.onended = function()  // Eğer video biterse.
	{
		$('button.baslat').html('<i class="fa fa-play" aria-hidden="true"></i>'); // Class'ı başlat olan butona play İKONU ekle.
		video.pause(); // Videoyu durdur.
	}

	$('input.video_sure').change(function(){  // Eğer video süre çubuğu değiştirilse.
		var video_suan_sure=video.duration*($(this).val()/100); // Süre çubuğunun değerini bul.
		video.currentTime=video_suan_sure; // Ve videonun zamanını süre çubuğundaki zamana eşitle.
	});

	$('input.video_ses').change(function(){  // Ses çubuğu değiştirilirse.
		video.volume=$(this).val()/100;  // Videonun sesini ses çubuğundaki değere eşitle.
	});

	$('button.ses').click(function(){ // Class'ı ses olan butona tıklayınca.
		$('input.video_ses').prop('value','0');
		video.volume=0; // Sesi kapat.
	});
});