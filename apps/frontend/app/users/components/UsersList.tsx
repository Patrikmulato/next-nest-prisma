import { User } from '@prisma/client';
import Link from 'next/link';

const TdStyle = {
  ThStyle: `w-1/6 min-w-[160px] border-l border-transparent py-4 px-3 text-lg font-medium text-white lg:py-7 lg:px-4`,
  TdStyle: `text-dark border-b border-l bg-dark-3 border-dark text-dark-7 py-5 px-2 text-center text-base font-medium`,
  TdStyle2: `text-dark border-b border-dark bg-dark-2 text-dark-7 py-5 px-2 text-center text-base font-medium`,
};

type UsersListProps = {
  promise: Promise<User[]>;
};

export const UsersList = async ({ promise }: UsersListProps) => {
  const users = await promise;

  const headers = Object.keys(users[0]);

  return (
    <section className='bg-dark py-20 lg:py-[120px]'>
      <div className='container'>
        <div className='flex flex-wrap -mx-4'>
          <div className='w-full '>
            <div className='max-w-full overflow-x-auto'>
              <table className='w-full table-auto'>
                <thead className='text-center bg-primary'>
                  <tr>
                    {headers.map((header) => (
                      <th key={header} className={TdStyle.ThStyle}>
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td className={TdStyle.TdStyle}>{user.id}</td>
                      <td className={TdStyle.TdStyle2}>{user.email}</td>
                      <td className={TdStyle.TdStyle}>
                        <Link href={`users/${user.id}`}>{user.name}</Link>
                      </td>
                      <td className={TdStyle.TdStyle2}>{user.role}</td>
                      <td className={TdStyle.TdStyle}>
                        {user.createdAt.toString()}
                      </td>
                      <td className={TdStyle.TdStyle2}>
                        {user.updatedAt.toString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
