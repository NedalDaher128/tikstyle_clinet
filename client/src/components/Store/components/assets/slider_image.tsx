import { useState } from 'react'
import image1 from '../../../../assets/img/1img.png'
import image2 from '../../../../assets/img/2img.png'
import image3 from '../../../../assets/img/3img.png'
import image4 from '../../../../assets/img/4img.png'
import { Box } from '@mui/material'; // أضفت Box هنا
function Slider_image() {
  const [silder, setsilder] = useState(0)
  const shoeQualityTexts = [
    "تألق وجمال يجتمعان في كل زوج من أحذيتنا. نحن نفخر بتقديم أعلى مستوى من الجودة في كل خيط وتفاصيل الأحذية لضمان راحتك وأناقتك.",
    "جودة لا تشوبها شائبة. في متجرنا، نحرص دائمًا على استخدام أفضل المواد والصناعة الدقيقة لضمان أن تحصل على أحذية تدوم وتتألق بأناقة.",
    "أحذيتنا هي نتاج جمع بين التصميم العصري والجودة الفائقة. نحن نفهم أن قدميك تستحق الأفضل، ولهذا نقدم لك أحذية لا مثيل لها.",
    "تسوق معنا واحصل على تجربة لا تنسى. جودة أحذيتنا تجعلها خيارًا مثاليًا لكل مناسبة. انطلق بثقة وراحة مع أحذيتنا الفاخرة.",
    "إذا كنت بحاجة إلى المزيد من الراحة والأناقة في حياتك، فلا تبحث بعيدًا. توفر أحذيتنا الفرصة لتجربة الأداء والأناقة في آن واحد. بفضل تصميماتنا العصرية والجودة العالية، ستجد أن قدميك لن تشعر بالراحة فحسب، بل ستظهر أيضًا بأناقة لا تضاهى.",
    "سواء كنت في البيت أو في العمل أو في مناسبة خاصة، ستجد دائمًا الحذاء المثالي لتلبية احتياجاتك. نحن نسعى دائمًا لتقديم أفضل تصاميم الأحذية التي تجمع بين الأناقة والراحة، حيث يتم اختيار المواد بعناية لضمان الجودة والمتانة.",
    "لن تعاني مرة أخرى من ألم القدمين أو عدم الراحة مع أحذيتنا. انطلق بثقة وراحة مع أفضل مجموعة من الأحذية المتاحة في السوق. نضمن لك أنك ستجد ما تبحث عنه وأكثر."
  ];
  const ShoeTitle = [
    "أحذية ماركات عالمية",
    "جودة عالية",
    "أحذية ماركات امريكية",
    "أسعار منافسة"
  ]
  const nameimage = [image1, image2, image3, image4]; // استخدم المتغيرات المستوردة

  const skip = () => {
    if (silder === 3) { // تم تعديل القيمة إلى 3
      setsilder(0);
    } else {
      setsilder(silder + 1);
    }
  }

  const back = () => {
    if (silder === 0) {
      setsilder(3); // تم تعديل القيمة إلى 3
    } else {
      setsilder(silder - 1);
    }
  }

  return (
    <Box
      className='flex flex-row items-center justify-between flex-wrap relative'
      sx={{
        flexDirection: { xs: 'column', md: 'row' },
      }}
      >
      <div className=' flex flex-row justify-between  my-auto  w-full absolute    '>
        <button onClick={back} className='text-xl  w-14 h-14  rounded-full  border-2 border-neutral-900  '>{"<"}</button>
        <button onClick={skip} className='text-xl  w-14 h-14 rounded-full  border-2 border-neutral-900  '>{">"}</button>
      </div>
      <div>
        <img src={nameimage[silder]} alt="" />
      </div>
      <Box
      sx={{
        width: { xs: '100%', md: '40%' },
      }}
      className=' w-2/5 '>
        <p className='text-4xl text-orange-500'>أحذية نايك</p>
        <p className='text-6xl'>{ShoeTitle[silder]}</p>
        <p className=' text-xl'>{shoeQualityTexts[silder]}</p> {/* تم تغيير الفهرس لعرض النص المتطابق مع الصورة المعروضة */}
      </Box>
      <div></div>
    </Box>
  );
}

export default Slider_image;
