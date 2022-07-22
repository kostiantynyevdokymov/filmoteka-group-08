export function removeSceletonLoad() {
      setTimeout(() => {
      const arr = document.querySelectorAll('.placeholdify');
      arr.forEach(el => el.classList.remove('placeholdify'));
      },2000);
}