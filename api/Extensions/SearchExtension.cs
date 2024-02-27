using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Extensions
{
    public static class SearchExtension
    {
        public static bool HasCommonPart(this string str1, string str2)
        {
            for (int i = 0; i < str1.Length - 2; i++)
            {
                string substring = str1.ToLower().Substring(i, 3);
                if (str2.ToLower().Contains(substring))
                {
                    return true;
                }
            }
            return false;
        }
    }
}