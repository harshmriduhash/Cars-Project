import { SearchBar, CustomFilter, CarCard, ShowMore } from '@/components';
import { fuels, yearsOfProduction } from '@/constants';
import { SearchParams } from '@/types';
import { fetchCars } from '@/utils';

async function MainContent({ searchParams }: SearchParams) {
  const allCars = await fetchCars({
    manufacturer: searchParams.manufacturer || '',
    year: searchParams.year || 2023,
    fuel: searchParams.fuel || '',
    limit: searchParams.limit || 10,
    model: searchParams.model || '',
  });
  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;

  return (
    <div className="mt-12 mb-12 padding-x padding-y max-width" id="discover">
      <div className="home__text-container">
        <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
        <p>Discover the car of your dreams</p>
      </div>
      <div className="home__filters">
        <SearchBar />

        <div className="home__filter-container mb-10">
          <CustomFilter title="fuel" options={fuels} />
          <CustomFilter title="year" options={yearsOfProduction} />
        </div>
      </div>
      {!isDataEmpty ? (
        <section>
          <div className="home__cars-wrapper">
            {allCars?.map((car) => (
              <CarCard car={car} />
            ))}
          </div>
          <ShowMore
            pageNumber={(searchParams.limit || 10) / 10}
            isNext={(searchParams.limit || 10) > allCars.length}
          />
        </section>
      ) : (
        <div className="home__error-container">
          <h2 className="text-black text-xl font-bold mt-10 mb-14">
            There's no any result.
          </h2>
          <p>{allCars?.message}</p>
        </div>
      )}
    </div>
  );
}

export default MainContent;
