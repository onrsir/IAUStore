import React, { Component } from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
class AboutUs extends Component {
    render() {
        return (

            <div>
                <div class="pagination-area bg-secondary">
                    <div class="container">
                        <div class="pagination-wrapper">
                            <ul>
                                <li><a href="/">Anasayfa</a><span> -</span></li>
                                <li>Hakkımızda</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="about-page-area bg-secondary section-space-bottom">
                    <div class="container">
                        
                        <div class="inner-page-details inner-page-padding">
                            <h3>Biz Kimiz</h3>
                            <p>Türkiye’nin en büyük ikinci el güvenilir moda mağazası olmayı hedefleyen Dolap olarak bir zamanlar çok severek aldığın ama şimdi kullanmadığın kıyafetlerini yeni sahipleriyle buluşturuyoruz.  Orijinal ürün kontrol sistemi, ücretsiz kargo ve 7/24 destek sistemimizle giymediklerini paraya dönüştürürken  çok seveceğin yeni ürünlere kolaylıkla ulaşmanı sağlıyoruz .

                                Elden ele modayla dönüştürebilir bir dünya yaratmak için seni de aramızda görmekten çok mutluyuz!</p>
                            <h3>Misyonumuz</h3>
                            <p>Koleksiyon stilinde tasarım sadelikten, orjinallikten, tutkudan, coşkudan ve yaratıcılıktan doğar. Koleksiyon’un ürettiği bir tasarım nesnesindeki yenilik hissinin ardında gerçekçi, berrak bir bakış açısı vardır. Gelenek ile diyalog halinde olması güvenilirliğini, kuşaklar boyunca gelecek ile diyalog halinde olması ise orjinalliğini sağlayan etkenlerdir. Günümüz dünyasında gerek bireylerin, gerekse ailelerin, kuruluşların, cemiyetlerin ve ülkelerin başarısı, daha iyi bir dünya için yaptıkları katkı bağlamında meşrudur. Bu nedenle Koleksiyon olarak en önemli ilkemiz, dünyanın bize sağladığı kaynakları en iyi şekilde kullanmak ve ancak ve ancak bu yolla ulaşılabilir ve dayanıklı tasarımlar yapmaktır. Bu vesile ile, coşkumuza ve heyecanımıza ortak olup daha güzel bir dünya için çalışan tüm mimarlara, tasarımcılara, müşterilerimize, bayilerimize, üretici firmalara ve rakiplerimize teşekkürü borç biliriz.</p>
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        )
    }
}
export default AboutUs;